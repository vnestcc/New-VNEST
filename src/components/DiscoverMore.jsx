import { useState, useEffect, useRef } from 'react';
import './DiscoverMore.css';

const DiscoverMore = ({ onGoToApplication }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  return (
    <section className="discover-more" ref={sectionRef}>
      <div className="background-container">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop&crop=center"
          alt="Global thinkers and engaged leaders"
          className="background-image"
          loading="lazy"
        />
        <div className="overlay"></div>
      </div>
      
      <div className="content-container">
        <div className={`content ${isVisible ? 'animate' : ''}`}>
          <h2 className="headline">
            Global thinkers, Engaged Leaders We'll take you higher.
          </h2>
          
          <p className="description">
            Are you a student, startup founder, or researcher with an idea worth building?
Join the V-NEST ecosystem and take the first step toward becoming a successful entrepreneur. From ideation to impact, we’re here to guide you at every milestone.
          </p>
          
          <button className="cta-button" onClick={onGoToApplication}>
            KNOW MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverMore;