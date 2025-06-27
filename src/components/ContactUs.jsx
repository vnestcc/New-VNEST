import React, { useState, useEffect, useRef } from 'react';
import './ContactUs.css';

const ContactUs = () => {
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
              <span className="number">40K+</span>
              <span className="text">STUDENT ACTIVE</span>
            </div>
          </div>
          
          <div className="student-image-container">
            <img
              src="./public/ChatGPT Image Jun 23, 2025, 04_25_28 PM.png"
              alt="Student with backpack"
              className={`student-image ${imageLoaded ? 'loaded' : ''}`}
              loading="lazy"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        
        <div className="right-section">
          <h1 className="main-heading">
            Through creativity, collaboration and inclusion, we seek and solve problems to improve students life.
          </h1>
          
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          
          <button className="contact-button">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;