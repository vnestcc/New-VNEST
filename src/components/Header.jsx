import React, { useState, useEffect } from 'react';
import './Header.css'; // Import your CSS file for styling
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onGoToApplication, onGoToAdmin, onGoToCareers }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              
              <li className="nav-item">
                <button 
                  onClick={onGoToCareers} 
                  className="nav-link nav-button"
                >
                  CAREERS
                </button>
              </li>
            </ul>
          </nav>

          <div className="cta-section">
            <a href="https://solveathon.vnest.org/" className="cta-button1" target='_blank'>SOLVEATHON</a>
            
            {!isAuthenticated() ? (
              <button onClick={onGoToApplication} className="cta-button1">LOGIN</button>
            ) : (
              <div className="user-menu-container">
                <button 
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="avatar-initials">{getInitials(user.name)}</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    
                    <div className="menu-divider"></div>
                    
                    {!isAdmin() && (
                      <button 
                        className="menu-item"
                        onClick={() => {
                          onGoToApplication();
                          setShowUserMenu(false);
                        }}
                      >
                        <User size={16} />
                        Dashboard
                      </button>
                    )}
                    
                    {isAdmin() && (
                      <button 
                        className="menu-item"
                        onClick={() => {
                          onGoToAdmin();
                          setShowUserMenu(false);
                        }}
                      >
                        <Settings size={16} />
                        Admin Panel
                      </button>
                    )}
                    
                    <div className="menu-divider"></div>
                    
                    <button className="menu-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
            
            <li className="mobile-nav-item">
              <button 
                onClick={() => { onGoToCareers(); closeMenu(); }} 
                className="mobile-nav-link nav-button"
              >
                CAREERS
              </button>
            </li>
            <li className="mobile-nav-item mobile-cta1">
              <a href="https://solveathon.vnest.org/" className="cta-button1" onClick={closeMenu} target="_blank">
                SOLVEATHON
              </a>
            </li>
            
            {/* User Menu in Mobile */}
            {!isAuthenticated() ? (
              <li className="mobile-nav-item mobile-cta1">
                <button onClick={() => { onGoToApplication(); closeMenu(); }} className="cta-button1">
                  LOGIN
                </button>
              </li>
            ) : (
              <>
                <li className="mobile-nav-item">
                  <div className="mobile-user-info">
                    <span className="mobile-user-name">{user.name}</span>
                    <span className="mobile-user-email">{user.email}</span>
                  </div>
                </li>
                
                {!isAdmin() && (
                  <li className="mobile-nav-item">
                    <button 
                      className="mobile-nav-link nav-button"
                      onClick={() => {
                        onGoToApplication();
                        closeMenu();
                      }}
                    >
                      DASHBOARD
                    </button>
                  </li>
                )}
                
                {isAdmin() && (
                  <li className="mobile-nav-item">
                    <button 
                      className="mobile-nav-link nav-button"
                      onClick={() => {
                        onGoToAdmin();
                        closeMenu();
                      }}
                    >
                      ADMIN PANEL
                    </button>
                  </li>
                )}
                
                <li className="mobile-nav-item">
                  <button 
                    className="mobile-nav-link nav-button logout-mobile"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;