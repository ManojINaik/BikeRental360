import React from 'react';
import { Menu, X, Bike, User, Search } from 'lucide-react';

type NavbarProps = {
  onSignInClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onDashboardClick: () => void;
};

const Navbar = ({ onSignInClick, isLoggedIn, onLogout, onDashboardClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the fixed navbar plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
              <Bike className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-2xl font-bold text-blue-600">BikeRental360</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('explore')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Explore Bikes
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('become-owner')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Become an Owner
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onDashboardClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onSignInClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('explore')}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Explore Bikes
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('become-owner')}
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Become an Owner
            </button>
            {isLoggedIn ? (
              <>
                <button 
                  onClick={onDashboardClick}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={onSignInClick}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;