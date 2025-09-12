import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    startups: 0,
    funding: 0,
    internships: 0
  });
  const sectionRef = useRef(null);

  // 🎯 Target V-NEST numbers
  const targetCounts = {
    students: 9032,
    startups: 24,
    funding: 1.5,       // in Crores
    internships: 162
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
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

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounts({
        students: Math.round(targetCounts.students * easeOutQuart),
        startups: Math.round(targetCounts.startups * easeOutQuart),
        funding: parseFloat((targetCounts.funding * easeOutQuart).toFixed(1)),
        internships: Math.round(targetCounts.internships * easeOutQuart)
      });

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return Math.floor(num / 1000) + 'K+';
    }
    return num + '+';
  };

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-content">
          {/* Left side - Text content */}
          <div className={`stats-text ${isVisible ? 'animate-fade-up' : ''}`}>
            <h2 className="stats-title">The V-NEST Story Through Numbers</h2>
            <p className="stats-description">
              In just a few years, V-NEST, VIT Chennai’s Startup & Research
              Foundation, has emerged as a thriving hub of innovation,
              incubation, and entrepreneurship. Backed by strong partners like
              Startup TN, EDII, and Startup India, V-NEST empowers students,
              faculty, and alumni to transform groundbreaking ideas into
              successful ventures.
            </p>
          </div>

          {/* Right side - Statistics */}
          <div className="stats-grid">
            {/* Students Benefited */}
            <div className={`stat-card ${isVisible ? 'animate-bounce-1' : ''}`}>
              <div className="stat-number">
                {counts.students >= 9000 ? '9000+' : formatNumber(counts.students)}
              </div>
              <div className="stat-label">
                <span>Students</span>
                <span>Benefited</span>
              </div>
            </div>

            {/* Startups Incubated */}
            <div className={`stat-card ${isVisible ? 'animate-bounce-2' : ''}`}>
              <div className="stat-number">
                {counts.startups >= 24 ? '24+' : counts.startups}
              </div>
              <div className="stat-label">
                <span>Startups</span>
                <span>Incubated</span>
              </div>
            </div>

            {/* Funding Raised */}
            <div className={`stat-card ${isVisible ? 'animate-bounce-3' : ''}`}>
              <div className="stat-number">
                ₹{counts.funding >= 1.5 ? '1.5 Cr+' : counts.funding + ' Cr'}
              </div>
              <div className="stat-label">
                <span>Funding</span>
                <span>Raised</span>
              </div>
            </div>

            {/* Internships Offered */}
            {/* <div className={`stat-card ${isVisible ? 'animate-bounce-4' : ''}`}>
              <div className="stat-number">
                {counts.internships >= 162 ? '162+' : counts.internships}
              </div>
              <div className="stat-label">
                <span>Internships</span>
                <span>Offered</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
