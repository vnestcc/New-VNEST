import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Careers from './Careers';
import JobModal from './JobModal';
import './CareersPage.css';

const CareersPage = ({ onGoBack }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="careers-page">
      <div className="careers-page-header">
        <div className="careers-page-nav">
          <button className="back-to-main" onClick={onGoBack}>
            <ChevronLeft size={20} />
            BACK TO V-NEST
          </button>
        </div>
      </div>
      <main className="careers-main">
        <Careers onJobClick={handleJobClick} />
      </main>
      {isModalOpen && (
        <JobModal 
          job={selectedJob} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CareersPage;
