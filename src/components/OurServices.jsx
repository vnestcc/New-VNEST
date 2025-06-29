import React, { useEffect, useRef, useState } from 'react';
import './OurServices.css';

const OurServices = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="our-services">
      <div className="container">
        {/* Header */}
        <div className={`services-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>

        {/* Service Cards */}
        <div className="services-grid">
          {/* Card 1 - Bounce In */}
          <div className={`service-card ${isVisible ? 'animate-bounce-in-1' : ''}`}>
            <div className="card-number">01</div>
            <h3 className="card-title1">Foreign University Collaboration</h3>
            <p className="card-description1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Card 2 - Highlighted with Bounce In */}
          <div className={`service-card highlighted ${isVisible ? 'animate-bounce-in-2' : ''}`}>
            <div className="card-number highlighted-number">02</div>
            <h3 className="card-title1">Educational Trips Abroad</h3>
            <p className="card-description1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Card 3 - Bounce In */}
          <div className={`service-card ${isVisible ? 'animate-bounce-in-3' : ''}`}>
            <div className="card-number">03</div>
            <h3 className="card-title1">Industrial Visits</h3>
            <p className="card-description1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* 4th Card */}
        <div className="fourth-card-container">
          <div className={`service-card fourth-card ${isVisible ? 'animate-bounce-in-4' : ''}`}>
            <div className="card-number">04</div>
            <h3 className="card-title1">Extended Service Description</h3>
            <p className="card-description1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ullam ut sed dolore error reiciendis, voluptate aperiam! Repudiandae vitae, eveniet voluptate earum illo error? Accusamus repellat repellendus nihil ab eos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;