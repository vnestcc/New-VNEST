import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from './LandingPage';
import ApplicationDashboard from './ApplicationDashboard';
import AdminDashboard from './AdminDashboard';
import CareersPage from './CareersPage';
import Convenors from './Convenors';
import Startups from './Startups';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Router = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Navigation functions
  const goToLanding = () => setCurrentPage('landing');
  const goToCareers = () => setCurrentPage('careers');
  const goToConvenors = () => setCurrentPage('convenors');
  const goToStartups = () => setCurrentPage('startups');
  const goToApplication = () => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }
    
    if (isAdmin()) {
      setCurrentPage('admin'); // Admins go to admin panel
      return;
    }
   
    setCurrentPage('application');
  };
  const goToAdmin = () => {
    if (!isAuthenticated() || !isAdmin()) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPage('admin');
  };

  const handleLoginSuccess = (userData) => {
    setShowLoginModal(false);
    // Check user role directly from login response
    if (userData && userData.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('application');
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setCurrentPage('application');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'application':
        return <ApplicationDashboard onGoToLanding={goToLanding} />;
      case 'admin':
        return <AdminDashboard onGoToLanding={goToLanding} />;
      case 'careers':
        return <CareersPage onGoBack={goToLanding} onGoToApplication={goToApplication} />;
      case 'convenors':
        return <Convenors onGoBack={goToLanding} />;
      case 'startups':
        return <Startups onGoBack={goToLanding} />;
      case 'landing':
      default:
        return (
          <LandingPage
            onGoToApplication={goToApplication}
            onGoToAdmin={goToAdmin}
            onGoToCareers={goToCareers}
            onGoToConvenors={goToConvenors}
            onGoToStartups={goToStartups}
          />
        );
    }
  };

  return (
    <>
      {renderCurrentPage()}
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Router;
