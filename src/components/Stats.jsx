import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    universities: 0,
    students: 0,
    courses: 0
  });
  const sectionRef = useRef(null);

  const targetCounts = {
    universities: 100,
    students: 20000,
    courses: 150
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
        universities: Math.round(targetCounts.universities * easeOutQuart),
        students: Math.round(targetCounts.students * easeOutQuart),
        courses: Math.round(targetCounts.courses * easeOutQuart)
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua.
            </p>
          </div>

          {/* Right side - Statistics */}
          <div className="stats-grid">
            <div className={`stat-card ${isVisible ? 'animate-bounce-1' : ''}`}>
              <div className="stat-number">
                {counts.universities >= 100 ? '100+' : counts.universities}
              </div>
              <div className="stat-label">
                <span>Worldwide</span>
                <span>Universities</span>
              </div>
            </div>

            <div className={`stat-card ${isVisible ? 'animate-bounce-2' : ''}`}>
              <div className="stat-number">
                {formatNumber(counts.students)}
              </div>
              <div className="stat-label">
                <span>Trusted</span>
                <span>Students</span>
              </div>
            </div>

            <div className={`stat-card ${isVisible ? 'animate-bounce-3' : ''}`}>
              <div className="stat-number">
                {counts.courses >= 150 ? '150+' : counts.courses}
              </div>
              <div className="stat-label">
                <span>Academic</span>
                <span>Courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;