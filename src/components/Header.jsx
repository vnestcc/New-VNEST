import React, { useState, useEffect } from 'react';
import './Header.css'; // Import your CSS file for styling
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    closeMenu(); // Close mobile menu after clicking
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-section">
            <img
              src="5c759bc3-e9de-42fa-aeaf-d6f44d6e1c85_removalai_preview.webp"
              alt="V-NEST Logo"
              className="logo-img"
              loading="lazy"
            />
          </div>

          <nav className="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="nav-link nav-button"
                >
                  ABOUT US
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="nav-link nav-button"
                >
                  SERVICES
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="nav-link nav-button"
                >
                  CONTACT US
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('faqs')} 
                  className="nav-link nav-button"
                >
                  FAQs
                </button>
              </li>
              

           
              <li className="nav-item">
                <button 
                  onClick={() => scrollToSection('sponsors')} 
                  className="nav-link nav-button"
                >
                  SPONSORS
                </button>
              </li>
            </ul>
          </nav>

          <div className="cta-section">
            <a href="https://solveathon.vnest.org/" className="cta-button1" target='_blank'>SOLVEATHON</a>
          </div>

          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <button 
                onClick={() => scrollToSection('about')} 
                className="mobile-nav-link nav-button"
              >
                ABOUT US
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                onClick={() => scrollToSection('services')} 
                className="mobile-nav-link nav-button"
              >
                SERVICES
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                onClick={() => scrollToSection('contact')} 
                className="mobile-nav-link nav-button"
              >
                CONTACT US
              </button>
            </li>
            <li className="mobile-nav-item">
              <button 
                onClick={() => scrollToSection('faqs')} 
                className="mobile-nav-link nav-button"
              >
                FAQs
              </button>
            </li>
            
            <li className="mobile-nav-item">
              <button 
                onClick={() => scrollToSection('sponsors')} 
                className="mobile-nav-link nav-button"
              >
                SPONSORS
              </button>
            </li>
            <li className="mobile-nav-item mobile-cta1">
              <a href="https://solveathon.vnest.org/" className="cta-button1" onClick={closeMenu}>
                SOLVEATHON
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;