// import React, { useState, useEffect } from 'react';
// import './Header.css'; // Import your CSS file for styling
// import { Menu, X } from 'lucide-react';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="header-container">
//           <div className="logo-section">
//             <img 
//               src="./favicon.svg" 
//               alt="V-NEST Logo" 
//               className="logo-img"
//               loading="lazy"
//             />
//           </div>

//           <nav className="nav-menu">
//             <ul className="nav-list">
//               <li className="nav-item">
//                 <a href="#about" className="nav-link">ABOUT US</a>
//               </li>
//               <li className="nav-item">
//                 <a href="#services" className="nav-link">SERVICES</a>
//               </li>
//               <li className="nav-item">
//                 <a href="#faqs" className="nav-link">FAQs</a>
//               </li>
//               <li className="nav-item">
//                 <a href="#contact" className="nav-link">CONTACT US</a>
//               </li>
//               <li className="nav-item">
//                 <a href="#sponsors" className="nav-link">SPONSORS</a>
//               </li>
//             </ul>
//             <a href="#solveathon" className="cta-button1">solveathon</a>
//           </nav>

//           <button 
//             className="mobile-menu-button" 
//             onClick={toggleMenu}
//             aria-label="Toggle mobile menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
//           <ul className="mobile-nav-list">
//             <li className="mobile-nav-item">
//               <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
//                 ABOUT US
//               </a>
//             </li>
//             <li className="mobile-nav-item">
//               <a href="#services" className="mobile-nav-link" onClick={closeMenu}>
//                 SERVICES
//               </a>
//             </li>
//             <li className="mobile-nav-item">
//               <a href="#faqs" className="mobile-nav-link" onClick={closeMenu}>
//                 FAQs
//               </a>
//             </li>
//             <li className="mobile-nav-item">
//               <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>
//                 CONTACT US
//               </a>
//             </li>
//             <li className="mobile-nav-item">
//               <a href="#sponsors" className="mobile-nav-link" onClick={closeMenu}>
//                 SPONSORS
//               </a>
//             </li>
//             <li className="mobile-nav-item mobile-cta1">
//               <a href="#solveathon" className="cta-button1" onClick={closeMenu}>
//                 solveathon
//               </a>
//             </li>
//           </ul>
//         </div>
//       </header>

//     </>
//   );
// };

// export default Header;













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
              src="./favicon.svg"
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
                  onClick={() => scrollToSection('faqs')} 
                  className="nav-link nav-button"
                >
                  FAQs
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
                  onClick={() => scrollToSection('sponsors')} 
                  className="nav-link nav-button"
                >
                  SPONSORS
                </button>
              </li>
            </ul>
            <a href="https://solveathon.vnest.org/" className="cta-button1" target='_blank'>solveathon</a>
          </nav>

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
                onClick={() => scrollToSection('faqs')} 
                className="mobile-nav-link nav-button"
              >
                FAQs
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
                onClick={() => scrollToSection('sponsors')} 
                className="mobile-nav-link nav-button"
              >
                SPONSORS
              </button>
            </li>
            <li className="mobile-nav-item mobile-cta1">
              <a href="https://solveathon.vnest.org/" className="cta-button1" onClick={closeMenu}>
                solveathon
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;



