import React, { useState } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';

const locations = [
  'Bengaluru, Karnataka',
  'Mysuru, Karnataka',
  'Mangaluru, Karnataka',
  'Hubballi-Dharwad, Karnataka',
  'Belagavi, Karnataka',
  'Kalaburagi, Karnataka',
  'Davanagere, Karnataka',
  'Ballari, Karnataka',
  'Vijayapura, Karnataka',
  'Shivamogga, Karnataka',
  'Tumakuru, Karnataka',
  'Hassan, Karnataka',
  'Udupi, Karnataka',
  'Manipal, Karnataka',
  'Kodagu, Karnataka'
];

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    showLocationDropdown: false
  });

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      location: e.target.value,
      showLocationDropdown: true
    }));
  };

  const handleLocationSelect = (location: string) => {
    setSearchData(prev => ({
      ...prev,
      location,
      showLocationDropdown: false
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      const offset = 80; // Height of the fixed navbar plus padding
      const elementPosition = exploreSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Calculate min date (today) and max date (6 months from now)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateString = maxDate.toISOString().split('T')[0];

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
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <div className="flex items-center space-x-2 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                    <MapPin className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Select city in Karnataka"
                      value={searchData.location}
                      onChange={handleLocationChange}
                      className="w-full focus:outline-none text-gray-700"
                      required
                    />
                  </div>
                  
                  {/* Location Dropdown */}
                  {searchData.showLocationDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
                      <ul className="max-h-48 overflow-auto rounded-md py-1">
                        {locations
                          .filter(loc => 
                            !searchData.location || 
                            loc.toLowerCase().includes(searchData.location.toLowerCase())
                          )
                          .map((loc, index) => (
                            <li 
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-gray-700"
                              onClick={() => handleLocationSelect(loc)}
                            >
                              {loc}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )}
                </div>

                {/* Date Input */}
                <div className="flex items-center space-x-2 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <Calendar className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData(prev => ({ ...prev, pickupDate: e.target.value }))}
                    min={today}
                    max={maxDateString}
                    className="w-full focus:outline-none text-gray-700"
                    required
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-center">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Bikes</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;