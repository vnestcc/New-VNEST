import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ onGoToApplication }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleApplyClick = () => {
    if (onGoToApplication) {
      onGoToApplication();
    }
  };

  return (
    <section className="hero">
      {/* Background Building Image */}
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          alt="Modern building background"
          className="background-image"
        />
        <div className="background-overlay"></div>
      </div>
  
      <div className="hero-container">
        {/* Left Content */}
        <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="hero-title">
            <span className="title-line">Empowering</span>
            <span className="title-line">Next-Gen Innovators</span>
            <span className="title-line title-innovation">at VIT Chennai</span>
          </h1>

          <p className="hero-subtitle">
            VNEST is the official startup incubator of VIT Chennai, providing an integrated ecosystem to transform ideas into scalable ventures.
          </p>

          <button 
            className="cta-buttonApply"
            onClick={handleApplyClick}
          >
            APPLY NOW
          </button>
        </div>

        {/* Right Visual with Student and Violet Bars */}
        <div className={`hero-visual ${isVisible ? 'fade-in-right' : ''}`}>
          {/* Violet Decorative Bars */}
           <div className="violet-bars">
            <div className="violet-bar bar-1"></div>
            <div className="violet-bar bar-2"></div>
            <div className="violet-bar bar-3"></div>
          </div> 

          {/* Graduate Student Image */}
          <div className="student-image-wrapper">
            <img 
              src="enter.webp"
              alt="Graduate student with diploma"
              className="student-image1"
              loading="lazy"
            />
          </div> 
        </div>
      </div>
    </section>
  );
};

export default Hero;