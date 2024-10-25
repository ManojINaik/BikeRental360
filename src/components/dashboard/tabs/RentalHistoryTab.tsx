import React from 'react';
import { Bike, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const RentalHistoryTab = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Rental History</h2>
      </div>

      {/* Show when no rental history */}
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Rental History</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Once you complete your first rental, your history will appear here.
        </p>
      </div>
    </div>
  );
};

export default RentalHistoryTab;