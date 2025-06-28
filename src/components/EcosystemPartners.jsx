import React, { useEffect, useRef, useState } from 'react';
import './EcosystemPartners.css';

const EcosystemPartners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: '0px 0px -50px 0px'
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
    <section className="ecosystem-partners" ref={componentRef}>
      <div className="ecosystem-container">
        <div className={`ecosystem-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="ecosystem-title">Ecosystem Partners</h2>
          <div className="ecosystem-underline"></div>
          <p className="ecosystem-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>

        <div className={`feature-wrapper ${isVisible ? 'animate-in' : ''}`}>
          <div className="feature-item">
            <div className="item-background"></div>
            <div className="content-container1">
              <img 
                src="./public/Understanding.png"
                alt="Ecosystem Display" 
                className="display-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemPartners;