import React, { useEffect, useState, useRef } from 'react';
import './Alumni.css';

const Alumni = () => {
  const [isVisible, setIsVisible] = useState(false);
  const alumniRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
      }
    );

    if (alumniRef.current) {
      observer.observe(alumniRef.current);
    }

    return () => {
      if (alumniRef.current) {
        observer.unobserve(alumniRef.current);
      }
    };
  }, []);

  return (
    <div className="alumni-container" ref={alumniRef}>
      <div className="alumni-content">
        <div className={`alumni-image-section ${isVisible ? 'slide-in-right' : ''}`}>
          <div className="green-background1"></div>
          <div className="alumni-image">
            <img 
              src="./image.webp" 
              alt="Alumni student"
            />
          </div>
        </div>
        
        <div className={`alumni-text-section ${isVisible ? 'slide-in-left' : ''}`}>
          <div className="quote">
            "At V-NEST, we're dedicated to empowering innovators who dare to think differently. Join us in creating solutions that will shape tomorrow's world. Your vision, our support—together we'll build something extraordinary."
          </div>
          
          <div className="attribution">
            <div className="author">— Dr. Sasikumar M</div>
            <div className="year">DIRECTOR - V-NEST</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;