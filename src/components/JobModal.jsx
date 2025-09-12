import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import './JobModal.css';

const JobModal = ({ job, onClose, onGoToApplication }) => {
  if (!job) return null;

  return (
    <div className="job-modal-wrapper">
      <div className="job-modal-content">
        <div className="job-modal-header">
          <h2>{job.title}</h2>
          <span className="job-department-badge">{job.department.toUpperCase()}</span>
          <button onClick={onClose} className="job-close-btn">&times;</button>
        </div>

        <div className="job-modal-body">
          <div className="job-meta-info">
            <div className="job-meta-item">
              <MapPin /> {job.location}
            </div>
            <div className="job-meta-item">
              <Clock /> {job.type}
            </div>
            <div className="job-meta-item">
              <Briefcase /> {job.experience}
            </div>
            <div className="job-meta-item">
              <DollarSign /> {job.salary}
            </div>
            <div className="job-meta-item">
              <Briefcase /> {job.workType}
            </div>
          </div>

          <div className="job-modal-description">
            <p>We are looking for a passionate {job.title} to join our growing team. You'll work on building scalable web applications using modern technologies and contribute to our mission of fostering innovation in the startup ecosystem.</p>
          </div>

          <div className="job-modal-details">
            <h3>Requirements:</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>

            <h3>Responsibilities:</h3>
            <ul>
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="job-modal-footer">
          <button className="job-apply-btn" onClick={onGoToApplication}>Apply Now</button>
          <button className="job-save-btn">Save Job</button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;

