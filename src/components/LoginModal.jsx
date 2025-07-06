import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Modal.css';

const LoginModal = ({ isOpen, onClose, onSuccess, onSwitchToRegister }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear form error when user starts typing
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const response = await login(formData);
      // Pass the user data to the success callback
      const userData = response.user || response;
      onSuccess(userData);
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {(formError || error) && (
            <div className="error-message">
              {formError || error}
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="switch-button"
              onClick={onSwitchToRegister}
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* <div className="admin-hint">
          <small>
            <strong>Admin Login:</strong> admin@vnest.com / admin123
          </small>
        </div> */}
      </div>
    </div>
  );
};

export default LoginModal;
