import React, { useEffect, useRef, useState } from 'react';
import './Convenors.css';

const Convenors = ({ onGoBack }) => {
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const convenorData = [
    {
      id: 1,
      name: "Dr. Sasikumar M",
      title: "Director, V-NEST",
      image: "./image.webp"
    },
    {
      id: 2,
      name: "Dr. Ravi V",
      title: "Assistant Director, V-NEST (IIC)",
      image: "./image2.webp"
    },
    {
      id: 3,
      name: "Dr. Karthiyaini S",
      title: "Assistant Director, V-NEST (EDC)",
      image: "./image3.webp"
    }
  ];

  return (
    <div className="convenors-page">
      {/* Header with back button */}
      <div className="convenors-header">
        <div className="convenors-nav">
          <button className="back-to-main" onClick={onGoBack}>
            ← BACK TO V-NEST
          </button>
        </div>
      </div>

      {/* Main content */}
      <section ref={sectionRef} className={`convenors ${isVisible ? 'animate' : ''}`}>
        <div className="container">
          {/* Section Title */}
          <h1 className="section-title">
            Our Convenors
          </h1>

          {/* Main Content */}
          <div className="main-content">
            {/* Left Content */}
            <div className="content-left">
              <h2 className="main-heading">
                Meet the Visionaries Behind V-NEST
              </h2>
              <p className="subtext">
                Our convenors are distinguished leaders who bring together diverse expertise from academia, 
                industry, and entrepreneurship. They guide our mission to transform innovative ideas into 
                successful ventures, providing strategic direction and mentorship to our incubatees. 
                With their combined experience spanning technology, business development, and startup 
                ecosystem building, they ensure V-NEST remains at the forefront of innovation and 
                entrepreneurship education.
              </p>
            </div>

            {/* Right Content with Main Image */}
            <div className="content-right">
              <div className="main-image-container">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="V-NEST Convenors Team"
                  loading="lazy"
                />
                <div className="purple-overlay"></div>
              </div>
            </div>
          </div>

          {/* Convenors Grid */}
          <div className="convenors-grid">
            {convenorData.map((convenor) => (
              <div
                key={convenor.id}
                className="convenor-card"
              >
                <div className="convenor-image-container">
                  <img
                    src={convenor.image}
                    alt={convenor.name}
                    loading="lazy"
                  />
                  <div className="convenor-overlay"></div>
                </div>
                <div className="convenor-info">
                  <h3 className="convenor-name">
                    {convenor.name}
                  </h3>
                  <h4 className="convenor-title">
                    {convenor.title}
                  </h4>
                  <p className="convenor-description">
                    {convenor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Convenors;
