import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import './Forms.css';

const AbstractForm = ({ onSuccess }) => {
  const { submitAbstract, abstractStatus, loading, error } = useForm();
  const [formData, setFormData] = useState({
    abstract: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Pre-fill form if user has already submitted
    if (abstractStatus && abstractStatus.abstract) {
      setFormData({
        abstract: abstractStatus.abstract
      });
    }
  }, [abstractStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.abstract.trim()) {
      setFormError('Please provide your idea abstract');
      return;
    }

    if (formData.abstract.trim().length < 100) {
      setFormError('Abstract must be at least 100 characters long');
      return;
    }

    try {
      await submitAbstract(formData);
      // Give a small delay to allow the status to update
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err) {
      setFormError(err.message || 'Failed to submit abstract. Please try again.');
    }
  };

  const isReadOnly = abstractStatus && abstractStatus.status === 'pending';

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>Step 1: Idea Abstract</h2>
        <p>
          Please provide a compelling abstract of your startup idea. Include your vision, 
          target market, and the problem you're solving.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="abstract">
            Startup Idea Abstract *
            <span className="char-count">
              {formData.abstract.length}/1000 characters
            </span>
          </label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            placeholder="Describe your startup idea, the problem it solves, your target market, and your unique value proposition. Be clear and concise while highlighting what makes your idea innovative and viable."
            rows={12}
            maxLength={1000}
            required
            readOnly={isReadOnly}
            className={isReadOnly ? 'readonly' : ''}
          />
          <div className="field-help">
            <p>
              <strong>Guidelines:</strong>
            </p>
            <ul>
              <li>Clearly define the problem your startup addresses</li>
              <li>Explain your proposed solution and its uniqueness</li>
              <li>Identify your target market and customer base</li>
              <li>Highlight your competitive advantage</li>
              <li>Mention potential impact and scalability</li>
            </ul>
          </div>
        </div>

        {(formError || error) && (
          <div className="error-message">
            {formError || error}
          </div>
        )}

        {abstractStatus && abstractStatus.status === 'pending' && (
          <div className="info-message">
            <p>
              <strong>Submission Status:</strong> Your abstract has been submitted and is currently under review. 
              You will be notified once it's approved to proceed to the next step.
            </p>
          </div>
        )}

        {abstractStatus && abstractStatus.status === 'approved' && (
          <div className="success-message">
            <p>
              <strong>Congratulations!</strong> Your abstract has been approved. 
              You can now proceed to Step 2: Detailed Business Plan.
            </p>
          </div>
        )}

        {abstractStatus && abstractStatus.status === 'rejected' && (
          <div className="error-message">
            <p>
              <strong>Feedback:</strong> Your abstract needs revision. Please update your submission 
              based on the feedback and resubmit.
            </p>
          </div>
        )}

        {!isReadOnly && (
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Abstract'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AbstractForm;
