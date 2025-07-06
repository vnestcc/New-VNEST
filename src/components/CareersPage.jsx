import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Careers from './Careers';
import './CareersPage.css';

const CareersPage = ({ onGoBack }) => {
  return (
    <div className="careers-page">
      <div className="careers-page-header">
        <div className="careers-page-nav">
          <button className="back-to-main" onClick={onGoBack}>
            <ChevronLeft size={20} />
            Back to V-NEST
          </button>
        </div>
      </div>
      <main className="careers-main">
        <Careers />
      </main>
    </div>
  );
};

export default CareersPage;
