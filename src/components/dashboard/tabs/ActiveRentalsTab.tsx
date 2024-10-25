import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const ActiveRentalsTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Current Rental</h2>
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Bike"
          className="w-full md:w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Harley-Davidson Iron 883</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Mar 15, 2024 - Mar 18, 2024</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>2 days remaining</span>
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Extend Rental
        </button>
      </div>
    </div>
  );
};

export default ActiveRentalsTab;