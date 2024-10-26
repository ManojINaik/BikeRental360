import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBikes from './components/FeaturedBikes';
import BikeFilters from './components/bikes/BikeFilters';
import BikeGrid from './components/bikes/BikeGrid';
import AuthModal from './components/auth/AuthModal';
import UserDashboard from './components/dashboard/UserDashboard';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSignInClick={() => setShowAuthModal(true)} isLoggedIn={!!user} />
      
      {user ? (
        <UserDashboard />
      ) : (
        <>
          <Hero />
          <FeaturedBikes onBookNowClick={() => !user && setShowAuthModal(true)} />
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Bikes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <BikeFilters />
                </div>
                <div className="lg:col-span-3">
                  <BikeGrid onBookNowClick={() => !user && setShowAuthModal(true)} />
                </div>
              </div>
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