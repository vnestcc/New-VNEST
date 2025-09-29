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
          <h2 className="services-title">Incubation Programs</h2>
          <p className="services-subtitle">
            Our incubation programs are designed to nurture innovative ideas and transform them into successful ventures. With tailored mentorship, access to industry networks, funding opportunities, and skill development, we empower startups to thrive from ideation to scaling.
          </p>
        </div>

        {/* Service Cards */}
        <div className="services-grid">
          {/* Card 1 - Bounce In */}
          <div className={`service-card ${isVisible ? 'animate-bounce-in-1' : ''}`}>
            <div className="card-number">01</div>
            <h3 className="card-title1">Early-Stage Incubation</h3>
            <p className="card-description1">
              For student and faculty startups in the idea or prototype stage. Includes mentorship, coworking access, and proof-of-concept support.
            </p>
          </div>

          {/* Card 2 - Highlighted with Bounce In */}
          <div className={`service-card highlighted ${isVisible ? 'animate-bounce-in-2' : ''}`}>
            <div className="card-number highlighted-number">02</div>
            <h3 className="card-title1">Accelerator Programs</h3>
            <p className="card-description1">
              Sector-specific tracks designed to fast-track startups toward market-readiness, funding, and scaling.
            </p>
          </div>

          {/* Card 3 - Bounce In */}
          <div className={`service-card ${isVisible ? 'animate-bounce-in-3' : ''}`}>
            <div className="card-number">03</div>
            <h3 className="card-title1">Industry Co-Incubation</h3>
            <p className="card-description1">
              Joint incubation with partner organizations to give startups access to specialized infrastructure, market linkages, and domain expertise.
            </p>
          </div>
        </div>

        {/* 4th Card */}
        <div className="fourth-card-container">
          <div className={`service-card fourth-card ${isVisible ? 'animate-bounce-in-4' : ''}`}>
            <div className="card-number">04</div>
            <h3 className="card-title1">Skill & Innovation Bootcamps</h3>
            <p className="card-description1">
              Hands-on workshops to develop entrepreneurial mindsets, design thinking, and digital product development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;