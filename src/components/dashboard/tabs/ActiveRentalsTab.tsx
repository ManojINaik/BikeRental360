import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const ActiveRentalsTab = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Current Rentals</h2>
      
      {/* Show when no active rentals */}
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Rentals</h3>
        <p className="text-gray-500 mb-6">You don't have any active bike rentals at the moment.</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Available Bikes
        </button>
      </div>
    </div>
  );
};

export default ActiveRentalsTab;