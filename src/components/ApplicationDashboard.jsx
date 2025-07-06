import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, Clock, XCircle, User, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../context/FormContext';
import AbstractForm from './forms/AbstractForm';
import DetailsForm from './forms/DetailsForm';
import PitchForm from './forms/PitchForm';
import './ApplicationDashboard.css';

const ApplicationDashboard = ({ onGoToLanding }) => {
  const { user, logout } = useAuth();
  const { 
    abstractStatus, 
    detailsStatus, 
    pitchStatus, 
    loading, 
    error,
    getCurrentStep,
    fetchAllStatuses 
  } = useForm();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAllStatuses();
  }, []);

  useEffect(() => {
    setCurrentStep(getCurrentStep());
  }, [abstractStatus, detailsStatus, pitchStatus]);

  const handleLogout = () => {
    logout();
    onGoToLanding();
  };

  const getStepStatus = (step) => {
    switch (step) {
      case 1:
        if (!abstractStatus) return 'not-started';
        return abstractStatus.status;
      case 2:
        if (!abstractStatus || abstractStatus.status !== 'approved') return 'locked';
        if (!detailsStatus) return 'not-started';
        return detailsStatus.status;
      case 3:
        if (!detailsStatus || detailsStatus.status !== 'approved') return 'locked';
        if (!pitchStatus) return 'not-started';
        return pitchStatus.status;
      default:
        return 'locked';
    }
  };

  const isStepAccessible = (step) => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return abstractStatus && abstractStatus.status === 'approved';
      case 3:
        return detailsStatus && detailsStatus.status === 'approved';
      default:
        return false;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="status-icon approved" size={20} />;
      case 'pending':
        return <Clock className="status-icon pending" size={20} />;
      case 'rejected':
        return <XCircle className="status-icon rejected" size={20} />;
      default:
        return <Clock className="status-icon locked" size={20} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      case 'locked':
        return 'Locked';
      default:
        return 'Not Started';
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Idea Abstract',
      description: 'Submit your innovative startup idea',
      icon: <FileText size={24} />,
      form: AbstractForm
    },
    {
      number: 2,
      title: 'Business Plan',
      description: 'Detailed business plan and strategy',
      icon: <User size={24} />,
      form: DetailsForm
    },
    {
      number: 3,
      title: 'Pitch Presentation',
      description: 'Schedule your final pitch',
      icon: <Calendar size={24} />,
      form: PitchForm
    }
  ];

  const renderStepCard = (step) => {
    const status = getStepStatus(step.number);
    const isAccessible = isStepAccessible(step.number);
    const isActive = currentStep === step.number;

    return (
      <div
        key={step.number}
        className={`step-card ${status} ${isActive ? 'active' : ''} ${!isAccessible ? 'locked' : ''}`}
      >
        <div className="step-header">
          <div className="step-icon">
            {step.icon}
          </div>
          <div className="step-info">
            <h3>Step {step.number}: {step.title}</h3>
            <p>{step.description}</p>
          </div>
          <div className="step-status">
            {getStatusIcon(status)}
            <span className="status-text">{getStatusText(status)}</span>
          </div>
        </div>
        
        {isAccessible && status !== 'approved' && (
          <div className="step-actions">
            <button
              className="step-button"
              onClick={() => setShowForm(step.number)}
              disabled={loading}
            >
              {status === 'pending' ? 'View Submission' : 'Start Step'}
            </button>
          </div>
        )}

        {status === 'rejected' && (
          <div className="rejection-message">
            <p>Your submission was not approved. Please revise and resubmit.</p>
            <button
              className="step-button retry"
              onClick={() => setShowForm(step.number)}
              disabled={loading}
            >
              Resubmit
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your application status...</p>
      </div>
    );
  }

  if (showForm) {
    const selectedStep = steps.find(s => s.number === showForm);
    const FormComponent = selectedStep.form;
    
    return (
      <div className="form-container">
        <div className="form-header">
          <button
            className="back-button"
            onClick={() => setShowForm(false)}
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <h2>Step {selectedStep.number}: {selectedStep.title}</h2>
        </div>
        <FormComponent onSuccess={() => setShowForm(false)} />
      </div>
    );
  }

  return (
    <div className="application-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <button 
            className="back-to-home"
            onClick={onGoToLanding}
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>
          <div className="user-info1">
            <h1>Welcome, {user.name}!</h1>
            <p>Track your application progress below</p>
          </div>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="progress-overview">
          <h2>Application Progress</h2>
          <div className="progress-bar">
            <div className="progress-steps">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`progress-step ${getStepStatus(step.number)} ${
                    currentStep >= step.number ? 'reached' : ''
                  }`}
                >
                  <div className="step-circle">
                    {getStepStatus(step.number) === 'approved' ? (
                      <CheckCircle size={16} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="step-label">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        <div className="steps-container">
          {steps.map(renderStepCard)}
        </div>

        {currentStep > 3 && (
          <div className="completion-message">
            <div className="completion-card">
              <CheckCircle className="completion-icon" size={48} />
              <h3>Application Complete!</h3>
              <p>
                Congratulations! You have successfully completed all application steps. 
                Our team will review your submission and contact you soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDashboard;
