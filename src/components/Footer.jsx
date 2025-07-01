import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  const handleLogoError = () => {
    setLogoLoaded(false);
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        <div className={`footer-content ${isVisible ? 'footer-content-visible' : ''}`}>
          {/* Company Info Section */}
          <div className="footer-section company-info">
            <div className="logo-container">
              {!logoLoaded && <div className="logo-placeholder">VNEST</div>}
              <img 
                src="5c759bc3-e9de-42fa-aeaf-d6f44d6e1c85_removalai_preview.webp"
                alt="Eduventures Logo"
                className="footer-logo"
                loading="lazy"
                onLoad={handleLogoLoad}
                onError={handleLogoError}
                style={{ display: logoLoaded ? 'block' : 'none' }}
              />
              <p className="tagline">EDUCATION BEYOND BOUNDARIES</p>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Vandalur–Kelambakkam Road</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Chennai, Tamil Nadu – 600127</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <span>+91 99019 28282</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>vnest@vit.ac.in</span>
              </div>
            </div>
          </div>

          {/* Links Sections Container for Mobile */}
          <div className="footer-links-container">
            {/* Locations Section */}
            <div className="footer-section">
              <h3 className="section-title1">Locations</h3>
              <ul className="footer-links">
                <li><a href="#usa">USA</a></li>
                <li><a href="#canada">Canada</a></li>
                <li><a href="#germany">Germany</a></li>
                <li><a href="#italy">Italy</a></li>
                <li><a href="#france">France</a></li>
              </ul>
            </div>

            {/* Helpful Links Section */}
            <div className="footer-section">
              <h3 className="section-title1">Helpful Links</h3>
              <ul className="footer-links">
                <li><a href="#news">News</a></li>
                <li><a href="#blogs">Blogs</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>

            {/* About Section */}
            <div className="footer-section">
              <h3 className="section-title1">About</h3>
              <ul className="footer-links">
                <li><a href="#about-us">About us</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
                <li><a href="#services">Services</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`footer-bottom ${isVisible ? 'footer-bottom-visible' : ''}`}>
          <div className="footer-bottom-left">
            <p className="copyright">
              Copyright © 2023 VNEST, All rights reserved. Powered by VNEST Incubator, VIT Chennai.
            </p>
            <div className="legal-links">
              <a href="#terms">Terms of Use</a>
              <span className="separator">|</span>
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="#contact">Contact us</a>
            </div>
          </div>
          
          <div className="social-icons">
            <a href="#facebook" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#instagram" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#twitter" className="social-icon">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;