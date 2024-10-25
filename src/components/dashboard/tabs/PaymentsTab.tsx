import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const PaymentsTab = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add New Card Button */}
          <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors">
            <CreditCard className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Add Payment Method</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        </div>

        {/* Show when no payment history */}
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Your payment history will appear here once you make your first rental payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;