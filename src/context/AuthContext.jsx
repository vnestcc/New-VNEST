import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      // Ensure user object has the correct structure
      const newUser = response.user || response;
      setUser(newUser);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login a user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      // Ensure user object has the correct structure
      const userData = response.user || response;
      setUser(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout the current user
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && authService.isLoggedIn();
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === "admin";
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;