import React from 'react';
import { Menu, X, Bike, User, Search } from 'lucide-react';

type NavbarProps = {
  onSignInClick: () => void;
  isLoggedIn: boolean;
};

const Navbar = ({ onSignInClick, isLoggedIn }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Bike className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-2xl font-bold text-blue-600">BikeRental360</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#explore" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Explore Bikes
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              How It Works
            </a>
            <a href="#become-owner" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Become an Owner
            </a>
            {isLoggedIn ? (
              <a href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
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
            <a href="#explore" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Explore Bikes
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              How It Works
            </a>
            <a href="#become-owner" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Become an Owner
            </a>
            {isLoggedIn ? (
              <a href="/dashboard" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
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