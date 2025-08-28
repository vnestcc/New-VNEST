import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase, Home } from 'lucide-react';
import './Careers.css';

const Careers = ({ onJobClick }) => {
  const footerRef = useRef(null);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/careers/jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        
        // Map API data to component format
        const mappedJobs = data.jobs.map(job => ({
          id: job.id,
          title: job.title,
          department: job.department || job.type || 'General',
          location: job.location || 'Remote',
          type: job.type || 'Full-Time',
          experience: job.experience || 'As per requirement',
          salary: job.salary || 'Competitive',
          workType: job.workType || 'Hybrid',
          description: job.description,
          requirements: job.requirements ? job.requirements.split('\n').filter(req => req.trim()) : [],
          responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter(resp => resp.trim()) : []
        }));
        
        setJobListings(mappedJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings');
        // Fallback to empty array if API fails
        setJobListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  return (
    <div className="careers-section" id="careers">
      <div className="careers-container">
        <div className="careers-header">
          <h2>Join Our Team</h2>
          <p>
            Build The Future Of Entrepreneurship With Us. We're Looking For Passionate Individuals Who Want To Make A Difference In The Startup Ecosystem.
          </p>
        </div>

        <div className="company-culture">
          <div className="culture-stats">
            <div className="stat-item">
              <Users className="stat-icon" />
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="stat-item">
              <Briefcase className="stat-icon" />
              <h3>100+</h3>
              <p>Startups Supported</p>
            </div>
            <div className="stat-item">
              <MapPin className="stat-icon" />
              <h3>3</h3>
              <p>Office Locations</p>
            </div>
          </div>
        </div>

        <div className="jobs-section">
          <h3>Open Positions</h3>
          {loading ? (
            <div className="loading-state">
              <p>Loading job listings...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : jobListings.length === 0 ? (
            <div className="empty-state">
              <p>No job openings available at the moment. Please check back later!</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobListings.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    <span className="department-badge">{job.department.toUpperCase()}</span>
                  </div>
                
                <div className="job-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="meta-item">
                    <Briefcase size={16} />
                    <span>{job.experience}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="meta-item">
                    <Home size={16} />
                    <span>{job.workType}</span>
                  </div>
                </div>

                <div className="job-description">
                  <p>{job.description}</p>
                </div>

                <div className="job-actions">
                  <button className="apply-btn" onClick={() => onJobClick(job)}>
                    KNOW MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        <div className="careers-footer1">
          <div className="footer-content1" ref={footerRef}>
            <h3>Don't See The Right Role?</h3>
            <p>
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="contact-btn1">
              SEND YOUR RESUME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
