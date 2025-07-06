import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import './Forms.css';

const PitchForm = ({ onSuccess }) => {
  const { schedulePitch, pitchStatus, loading, error } = useForm();
  const [formData, setFormData] = useState({
    scheduled_date: '',
    notes: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Pre-fill form if user has already submitted
    if (pitchStatus) {
      setFormData({
        scheduled_date: pitchStatus.scheduled_date ? 
          new Date(pitchStatus.scheduled_date).toISOString().slice(0, 16) : '',
        notes: pitchStatus.notes || ''
      });
    }
  }, [pitchStatus]);

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
    if (!formData.scheduled_date) {
      setFormError('Please select a preferred date and time for your pitch');
      return;
    }

    // Check if the selected date is in the future
    const selectedDate = new Date(formData.scheduled_date);
    const now = new Date();
    if (selectedDate <= now) {
      setFormError('Please select a future date and time');
      return;
    }

    // Check if the selected date is within business hours (9 AM - 6 PM, Monday-Friday)
    const dayOfWeek = selectedDate.getDay();
    const hour = selectedDate.getHours();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setFormError('Please select a weekday (Monday to Friday)');
      return;
    }

    if (hour < 9 || hour >= 18) {
      setFormError('Please select a time between 9:00 AM and 6:00 PM');
      return;
    }

    try {
      const submissionData = {
        ...formData,
        scheduled_date: selectedDate.toISOString()
      };
      await schedulePitch(submissionData);
      onSuccess();
    } catch (err) {
      setFormError(err.message || 'Failed to schedule pitch. Please try again.');
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().slice(0, 16);
  };

  const isReadOnly = pitchStatus && pitchStatus.status === 'scheduled';

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>Step 3: Schedule Pitch Presentation</h2>
        <p>
          Schedule your final pitch presentation where you'll present your startup idea 
          to our expert panel of mentors and investors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="scheduled_date">
            Preferred Date & Time *
          </label>
          <input
            type="datetime-local"
            id="scheduled_date"
            name="scheduled_date"
            value={formData.scheduled_date}
            onChange={handleInputChange}
            min={getMinDate()}
            max={getMaxDate()}
            required
            readOnly={isReadOnly}
            className={isReadOnly ? 'readonly' : ''}
          />
          <div className="field-help">
            <p>
              <strong>Guidelines:</strong>
            </p>
            <ul>
              <li>Select a date at least 24 hours from now</li>
              <li>Available slots: Monday to Friday, 9:00 AM to 6:00 PM</li>
              <li>Pitch duration: 15-20 minutes + Q&A</li>
              <li>We'll confirm your slot within 24 hours</li>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            Additional Notes (Optional)
            <span className="char-count">
              {formData.notes.length}/500 characters
            </span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any special requirements, technical setup needs, or additional information for your pitch presentation?"
            rows={4}
            maxLength={500}
            readOnly={isReadOnly}
            className={isReadOnly ? 'readonly' : ''}
          />
          <div className="field-help">
            <p>
              Let us know about any specific requirements for your presentation:
            </p>
            <ul>
              <li>Technical setup (projector, demo requirements)</li>
              <li>Accessibility needs</li>
              <li>Team members who will present</li>
              <li>Time zone preferences (if remote)</li>
            </ul>
          </div>
        </div>

        {(formError || error) && (
          <div className="error-message">
            {formError || error}
          </div>
        )}

        {pitchStatus && pitchStatus.status === 'scheduled' && (
          <div className="success-message">
            <p>
              <strong>Pitch Scheduled!</strong> Your pitch presentation has been scheduled for{' '}
              {new Date(pitchStatus.scheduled_date).toLocaleString()}. 
              You will receive a confirmation email with detailed instructions soon.
            </p>
          </div>
        )}

        {pitchStatus && pitchStatus.status === 'completed' && (
          <div className="info-message">
            <p>
              <strong>Pitch Completed:</strong> Thank you for your presentation! 
              Our team will review your pitch and get back to you with the next steps.
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
              {loading ? 'Scheduling...' : 'Schedule Pitch'}
            </button>
          </div>
        )}

        <div className="pitch-info">
          <h3>What to Expect in Your Pitch</h3>
          <div className="info-grid">
            <div className="info-item">
              <h4>Presentation (10-15 minutes)</h4>
              <ul>
                <li>Problem statement and solution</li>
                <li>Market opportunity and validation</li>
                <li>Business model and revenue</li>
                <li>Team and execution plan</li>
                <li>Financial projections and funding ask</li>
              </ul>
            </div>
            <div className="info-item">
              <h4>Q&A Session (5-10 minutes)</h4>
              <ul>
                <li>Technical implementation questions</li>
                <li>Market strategy discussions</li>
                <li>Financial model clarifications</li>
                <li>Team and execution queries</li>
                <li>Investment and partnership opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PitchForm;
