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
              src="https://web.archive.org/web/20240627165030im_/https://eduventures.net.in/wp-content/uploads/2023/09/enjoying-the-campus-life.jpg" 
              alt="Alumni student"
            />
          </div>
        </div>
        
        <div className={`alumni-text-section ${isVisible ? 'slide-in-left' : ''}`}>
          <div className="quote">
            " I relied on my independence, tenacity and ability to take things lightly — because college was a walk in the park compared to where I grew up."
          </div>
          
          <div className="attribution">
            <div className="author">— Angelina Francis</div>
            <div className="year">ALUMNI 2020</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;