import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Startups.css';

const Startups = ({ onGoBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

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

  // Real startup data with logos from sample folder
  const startupsData = [
    // Section 1 (0-9)
    [
      { id: 1, name: "CITTAA", logo: "./sample/removedbg/CITTAA-removebg-preview.png", description: "Innovative technology solutions for urban development and smart city initiatives" },
      { id: 2, name: "CRACKUBE", logo: "./sample/removedbg/CRACKUBE_LOGO_JPG_TRANSPARENT-removebg-preview.png", description: "Advanced software development and digital transformation services" },
      { id: 3, name: "Chakaralaya Analytics", logo: "./sample/removedbg/Chakaralaya_Analytics-removebg-preview.png", description: "Data analytics and business intelligence solutions for enterprises" },
      { id: 4, name: "FEYNMAN TECHSOL", logo: "./sample/removedbg/FEYNMAN_TECHSOL-removebg-preview.png", description: "Technology solutions and engineering services for modern businesses" },
      { id: 5, name: "INICIOTEK", logo: "./sample/removedbg/INICIOTEK-removebg-preview.png", description: "Startup technology incubation and development platform" },
      { id: 6, name: "JIVAN", logo: "./sample/removedbg/JIVAN-removebg-preview.png", description: "Healthcare technology and life sciences innovation solutions" },
      { id: 7, name: "MEDxAI Innovations", logo: "./sample/removedbg/LOGO_MEDxAI_Innovations-Photoroom.png", description: "AI-powered medical diagnostics and healthcare automation" },
      { id: 8, name: "MAFKIN ROBOTICS", logo: "./sample/removedbg/MAFKIN_ROBOTICS-removebg-preview.png", description: "Advanced robotics solutions for industrial automation" },
      { id: 9, name: "Mechatronix India", logo: "./sample/removedbg/Mechatronix_India-removebg-preview.png", description: "Mechatronics engineering and automation technology services" },
      { id: 10, name: "Mechonix D2R", logo: "./sample/removedbg/Mechonix_D2R-removebg-preview.png", description: "Design to reality engineering solutions and product development" }
    ],
    // Section 2 (10-11) - Additional real startups
    [
      { id: 11, name: "Quinproc", logo: "./sample/removedbg/Quinproc-removebg-preview.png", description: "Process optimization and quality management solutions" },
      { id: 12, name: "STEMTEC", logo: "./sample/removedbg/STEMTEC_logo-removebg-preview.png", description: "STEM education technology and learning platform solutions" }
    ]
  ];

  const totalSections = startupsData.length;

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % totalSections);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + totalSections) % totalSections);
  };

  const goToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className="startups-page">
      {/* Header with back button */}
      <div className="startups-header">
        <div className="startups-nav">
          <button className="back-to-main" onClick={onGoBack}>
            ← BACK TO V-NEST
          </button>
        </div>
      </div>

      {/* Main content */}
      <section ref={sectionRef} className={`startups ${isVisible ? 'animate' : ''}`}>
        <div className="container">
          {/* Section Title */}
          <h1 className="section-title">
            Our Startups
          </h1>

          {/* Description */}
          <div className="startups-description">
            <h2 className="main-heading">
              Innovative Startups Transforming Industries
            </h2>
            <p className="subtext">
              Discover the groundbreaking startups incubated at V-NEST. From AI and healthcare to 
              sustainability and fintech, our portfolio companies are solving real-world problems 
              and creating lasting impact across diverse sectors.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="carousel-container">
            {/* Navigation Arrows */}
            <button 
              className="carousel-arrow carousel-arrow-left" 
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              className="carousel-arrow carousel-arrow-right" 
              onClick={nextSection}
              disabled={currentSection === totalSections - 1}
            >
              <ChevronRight size={24} />
            </button>

            {/* Startups Grid */}
            <div className="startups-carousel" ref={carouselRef}>
              <div 
                className="startups-track"
                style={{ transform: `translateX(-${currentSection * 100}%)` }}
              >
                {startupsData.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="startups-section">
                    <div className={`startups-grid ${section.length <= 5 ? 'small-section' : ''}`}>
                      {section.map((startup) => (
                        <div key={startup.id} className="startup-card">
                          <div className="startup-logo">
                            <img src={startup.logo} alt={`${startup.name} logo`} />
                          </div>
                          <div className="startup-info">
                            <h3 className="startup-name">{startup.name}</h3>
                            <p className="startup-description">{startup.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Indicators */}
            {/* <div className="section-indicators">
              {Array.from({ length: totalSections }, (_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSection === index ? 'active' : ''}`}
                  onClick={() => goToSection(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div> */}

            {/* Section Info */}
            {/* <div className="section-info">
              <span>Section {currentSection + 1} of {totalSections}</span>
              <span>({startupsData[currentSection].length} startups)</span>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Startups;
