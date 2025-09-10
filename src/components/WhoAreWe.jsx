// WhoAreWe.jsx
import React, { useEffect, useRef, useState } from 'react';
import './WhoAreWe.css';

const WhoAreWe = () => {
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
        threshold: 0.2, // Trigger when 20% of the component is visible
        rootMargin: '-50px 0px', // Start animation 50px before entering viewport
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

  const collaborationCards = [
    {
      id: 1,
      title: 'Incubation Infrastructure',
      description: 'State-of-the-art coworking spaces, labs, and maker facilities within the VIT Chennai campus.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
      ),
      isHighlighted: false
    },
    {
      id: 2,
      title: 'Mentorship & Training',
      description: 'Access to expert mentors from academia, industry, and global networks.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
        </svg>
      ),
      isHighlighted: true
    },
    {
      id: 3,
      title: 'Funding Access',
      description: 'Seed funding up to ₹2 lakh, with credit-linkage opportunities and investor connects.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
      isHighlighted: false
    }
  ];

  return (
    <section ref={sectionRef} className={`who-are-we ${isVisible ? 'animate' : ''}`}>
      <div className="container">
        {/* Section Title */}
        <h1 className="section-title">
          Who we are
        </h1>

        {/* Main Content */}
        <div className="main-content">
          {/* Left Content */}
          <div className="content-left">
            <h2 className="main-heading1">
              V-NEST:  A place to learn, A chance to grow 
            </h2>
            <p className="subtext">
              Backed by a strong academic environment and anchored in VIT’s commitment to innovation, V-NEST helps aspiring entrepreneurs turn their ideas into viable, impact-driven ventures. With a focus on sustainability, digital transformation, and industry alignment, our programs empower startups to solve real-world problems.
            </p>
            <button className="know-more-btn">KNOW MORE</button>
          </div>

          {/* Right Content with Image and Stats */}
          <div className="content-right">
            <div className="image-container">
              <img
                src="https://web.archive.org/web/20240627165030im_/https://eduventures.net.in/wp-content/uploads/2023/09/closeup-shot-two-domed-towers-old-royal-naval-college-greenwich-london-2048x1138.webp"
                alt="University Building"
                loading="lazy"
              />
              <div className="green-overlay"></div>
            </div>
          </div>
        </div>

        {/* Collaboration Cards */}
        <div className="collaboration-cards">
          {collaborationCards.map((card) => (
            <div
              key={card.id}
              className={`collaboration-card ${card.isHighlighted ? 'highlighted' : ''}`}
            >
              <div className="card-icon">
                {card.icon}
              </div>
              <h3 className="card-title">
                {card.title}
              </h3>
              <p className="card-description">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;