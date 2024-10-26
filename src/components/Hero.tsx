import React from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-12 sm:pt-48 lg:pt-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
            Ride Your Dream Bike Today
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Discover the freedom of two wheels with our premium motorcycle rental service. 
            Book instantly, ride confidently.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center space-x-2 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <input
                  type="text"
                  placeholder="Pick-up Date"
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search Bikes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;