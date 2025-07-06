import React, { createContext, useState, useEffect, useContext } from 'react';
import { formService } from '../services/api';
import { useAuth } from './AuthContext';

// Create the context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  const [abstractStatus, setAbstractStatus] = useState(null);
  const [detailsStatus, setDetailsStatus] = useState(null);
  const [pitchStatus, setPitchStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Clear data when user changes and fetch new data when authenticated
  useEffect(() => {
    if (isAuthenticated() && user) {
      // If different user, clear all data first
      if (currentUserId && currentUserId !== user.id) {
        setAbstractStatus(null);
        setDetailsStatus(null);
        setPitchStatus(null);
        setError(null);
      }
      setCurrentUserId(user.id);
      fetchAllStatuses();
    } else {
      // Clear data when not authenticated
      setAbstractStatus(null);
      setDetailsStatus(null);
      setPitchStatus(null);
      setError(null);
      setCurrentUserId(null);
    }
  }, [isAuthenticated, user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch all submission statuses
  const fetchAllStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.getAllSubmissions();
      
      if (response.abstract) {
        setAbstractStatus(response.abstract);
      }
      
      if (response.details) {
        setDetailsStatus(response.details);
      }
      
      if (response.pitch) {
        setPitchStatus(response.pitch);
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching submission statuses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit abstract (Step 1)
  const submitAbstract = async (abstractData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.submitAbstract(abstractData);
      await fetchAbstractStatus(); // Refresh status after submission
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch abstract status
  const fetchAbstractStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.getAbstractStatus();
      // Handle the API response structure
      const abstractData = response.abstract || response;
      setAbstractStatus(abstractData);
      return abstractData;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching abstract status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit details (Step 2)
  const submitDetails = async (detailsData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.submitDetails(detailsData);
      await fetchDetailsStatus(); // Refresh status after submission
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch details status
  const fetchDetailsStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.getDetailsStatus();
      // Handle the API response structure
      const detailsData = response.details || response;
      setDetailsStatus(detailsData);
      return detailsData;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching details status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Schedule pitch (Step 3)
  const schedulePitch = async (pitchData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.schedulePitch(pitchData);
      await fetchPitchStatus(); // Refresh status after submission
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch pitch status
  const fetchPitchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await formService.getPitchStatus();
      // Handle the API response structure
      const pitchData = response.pitch || response;
      setPitchStatus(pitchData);
      return pitchData;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pitch status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get current step based on statuses
  const getCurrentStep = () => {
    // If no abstract submitted or rejected, start at step 1
    if (!abstractStatus || abstractStatus.status === 'rejected') {
      return 1;
    }
    
    // If abstract is pending, stay at step 1
    if (abstractStatus.status === 'pending') {
      return 1;
    }
    
    // If abstract approved but no details submitted or details rejected, go to step 2
    if (abstractStatus.status === 'approved' && (!detailsStatus || detailsStatus.status === 'rejected')) {
      return 2;
    }
    
    // If details are pending, stay at step 2
    if (detailsStatus && detailsStatus.status === 'pending') {
      return 2;
    }
    
    // If details approved but no pitch scheduled or pitch rejected, go to step 3
    if (detailsStatus && detailsStatus.status === 'approved' && (!pitchStatus || pitchStatus.status === 'cancelled')) {
      return 3;
    }
    
    // If pitch is scheduled or completed, application complete
    if (pitchStatus && (pitchStatus.status === 'scheduled' || pitchStatus.status === 'completed')) {
      return 4;
    }
    
    // Default to step 1
    return 1;
  };

  // Context value
  const value = {
    abstractStatus,
    detailsStatus,
    pitchStatus,
    loading,
    error,
    submitAbstract,
    submitDetails,
    schedulePitch,
    fetchAllStatuses,
    getCurrentStep,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export default FormContext;