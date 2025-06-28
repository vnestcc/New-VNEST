import React, { useState, useEffect, useRef } from 'react';
import './ApplyNow.css';

const ApplyNow = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={componentRef}
      className="apply-now-section"
    >
      <div className="apply-now-container">
        <div className="geometric-elements">
          <div className="purple-block left-rect"></div>
          <div className="purple-block center-rect"></div>
          <div className="purple-block right-rect"></div>
        </div>
        
                  <div className={`content ${isVisible ? 'content-animate' : ''}`}>
          <div className="accent-line"></div>
          <h2 className="heading">
            Are you ready to take the next<br />
            step towards your future career?
          </h2>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor<br />
            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.
          </p>
          <button className="apply-button">
            APPLY NOW
            <svg className="button-arrow" width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M14 1L19 6L14 11M19 6H1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;