import React, { useState, useEffect, useRef } from 'react';
import './ContactUs.css';

const ContactUs = ({ onGoToApplication }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={componentRef} 
      className={`contact-us-container ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="contact-us-content">
        <div className="left-section">
          <div className="decorative-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="student-badge">
            <div className="badge-content">
              <span className="number">24K+</span>
              <span className="text">STUDENT ACTIVE</span>
            </div>
          </div>
          
          <div className="student-image-container">
  <img
    src="ChatGPT Image Jun 23, 2025, 04_25_28 PM.webp"  
    alt="Student with backpack"
    className={`student-image ${imageLoaded ? 'loaded' : ''}`}
    loading="lazy"
    onLoad={handleImageLoad}
  />
</div>
        </div>
        
        <div className="right-section">
          <h1 className="main-heading">
            VNEST has signed strategic MOUs with several organizations that bring unique value to our incubatees:
          </h1>
          
          <div className="description">
            <div className="partner-item">Entreovert People Association</div>
            <div className="partner-item">Physics Mindboggler Scientific Pvt. Ltd.</div>
            <div className="partner-item">Singapore South Asia Chamber of Commerce & Industry (SSACCI)</div>
            <div className="partner-item">Institute of Technology and Network Training (ITNT)</div>
            <div className="partner-item">Open Weaver India Pvt. Ltd.</div>
            <div className="partner-item">Tamil Nadu Apex Skill Development Centre for Logistics (TNASDCL)</div>
            <div className="partner-item">Indian Overseas Bank (via CANG)</div>
            <div className="partner-item">Qmax Systems India Pvt. Ltd.</div>
          </div>

          
          <button className="contact-button" onClick={onGoToApplication}>
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;