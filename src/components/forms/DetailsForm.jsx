import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import './Forms.css';

const DetailsForm = ({ onSuccess }) => {
  const { submitDetails, detailsStatus, loading, error } = useForm();
  const [formData, setFormData] = useState({
    full_description: '',
    documents_url: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Pre-fill form if user has already submitted
    if (detailsStatus) {
      setFormData({
        full_description: detailsStatus.full_description || '',
        documents_url: detailsStatus.documents_url || ''
      });
    }
  }, [detailsStatus]);

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
    if (!formData.full_description.trim()) {
      setFormError('Please provide a detailed business description');
      return;
    }

    if (formData.full_description.trim().length < 500) {
      setFormError('Business description must be at least 500 characters long');
      return;
    }

    // Optional URL validation
    if (formData.documents_url && !isValidUrl(formData.documents_url)) {
      setFormError('Please provide a valid URL for documents');
      return;
    }

    try {
      await submitDetails(formData);
      onSuccess();
    } catch (err) {
      setFormError(err.message || 'Failed to submit details. Please try again.');
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isReadOnly = detailsStatus && detailsStatus.status === 'pending';

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>Step 2: Detailed Business Plan</h2>
        <p>
          Provide comprehensive details about your business plan, including market analysis, 
          financial projections, and implementation strategy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="full_description">
            Detailed Business Description *
            <span className="char-count">
              {formData.full_description.length}/5000 characters
            </span>
          </label>
          <textarea
            id="full_description"
            name="full_description"
            value={formData.full_description}
            onChange={handleInputChange}
            placeholder="Provide a comprehensive description of your business plan including market analysis, competitive landscape, business model, revenue streams, financial projections, team structure, implementation timeline, and growth strategy."
            rows={15}
            maxLength={5000}
            required
            readOnly={isReadOnly}
            className={isReadOnly ? 'readonly' : ''}
          />
          <div className="field-help">
            <p>
              <strong>Include the following sections:</strong>
            </p>
            <ul>
              <li>Market Analysis & Size</li>
              <li>Competitive Landscape</li>
              <li>Business Model & Revenue Streams</li>
              <li>Financial Projections (3-5 years)</li>
              <li>Team Structure & Key Personnel</li>
              <li>Implementation Timeline</li>
              <li>Marketing & Sales Strategy</li>
              <li>Risk Analysis & Mitigation</li>
              <li>Funding Requirements</li>
              <li>Growth & Scaling Strategy</li>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="documents_url">
            Supporting Documents URL (Optional)
          </label>
          <input
            type="url"
            id="documents_url"
            name="documents_url"
            value={formData.documents_url}
            onChange={handleInputChange}
            placeholder="https://drive.google.com/... (Link to business plan documents, financial models, etc.)"
            readOnly={isReadOnly}
            className={isReadOnly ? 'readonly' : ''}
          />
          <div className="field-help">
            <p>
              You can upload supporting documents (business plan PDF, financial models, market research, etc.) 
              to Google Drive, Dropbox, or similar services and share the public link here.
            </p>
          </div>
        </div>

        {(formError || error) && (
          <div className="error-message">
            {formError || error}
          </div>
        )}

        {detailsStatus && detailsStatus.status === 'pending' && (
          <div className="info-message">
            <p>
              <strong>Submission Status:</strong> Your detailed business plan has been submitted and is currently under review. 
              You will be notified once it's approved to proceed to the final step.
            </p>
          </div>
        )}

        {detailsStatus && detailsStatus.status === 'approved' && (
          <div className="success-message">
            <p>
              <strong>Excellent!</strong> Your business plan has been approved. 
              You can now proceed to Step 3: Schedule your pitch presentation.
            </p>
          </div>
        )}

        {detailsStatus && detailsStatus.status === 'rejected' && (
          <div className="error-message">
            <p>
              <strong>Feedback:</strong> Your business plan needs revision. Please update your submission 
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
              {loading ? 'Submitting...' : 'Submit Business Plan'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DetailsForm;
