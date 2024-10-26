import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBikes from './components/FeaturedBikes';
import BikeFilters from './components/bikes/BikeFilters';
import BikeGrid from './components/bikes/BikeGrid';
import AuthModal from './components/auth/AuthModal';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import HowItWorks from './components/HowItWorks';
import BecomeOwner from './components/BecomeOwner';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { currentUser, logout } = useAuth();

  // Mock admin check - replace with actual admin check logic
  const isAdmin = currentUser?.email === 'admin@example.com';

  const handleLogout = async () => {
    try {
      await logout();
      setShowDashboard(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleDashboardToggle = () => {
    setShowDashboard(!showDashboard);
  };

  const handleBookNowClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onSignInClick={() => setShowAuthModal(true)} 
        isLoggedIn={!!currentUser}
        onLogout={handleLogout}
        onDashboardClick={handleDashboardToggle}
        isAdmin={isAdmin}
      />
      
      {showDashboard && currentUser ? (
        isAdmin ? (
          <AdminDashboard onClose={() => setShowDashboard(false)} />
        ) : (
          <UserDashboard onClose={() => setShowDashboard(false)} />
        )
      ) : (
        <>
          <Hero />
          <FeaturedBikes onBookNowClick={handleBookNowClick} />
          
          <section id="explore" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Bikes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <BikeFilters />
                </div>
                <div className="lg:col-span-3">
                  <BikeGrid onBookNowClick={handleBookNowClick} />
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HowItWorks />
            </div>
          </section>

          <section id="become-owner" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BecomeOwner onGetStarted={handleBookNowClick} />
            </div>
          </section>
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default App;