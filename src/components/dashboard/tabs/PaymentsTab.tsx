import React from 'react';
import { CreditCard, Calendar, Download } from 'lucide-react';

const payments = [
  {
    id: 1,
    bike: 'BMW R nineT',
    date: 'Mar 10, 2024',
    amount: '$417',
    status: 'Completed',
    cardLast4: '4242'
  },
  {
    id: 2,
    bike: 'Ducati Monster',
    date: 'Feb 28, 2024',
    amount: '$238',
    status: 'Completed',
    cardLast4: '5555'
  },
  {
    id: 3,
    bike: 'Triumph Street Triple',
    date: 'Feb 15, 2024',
    amount: '$396',
    status: 'Refunded',
    cardLast4: '4242'
  }
];

const PaymentsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-500">Default</span>
            </div>
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/25</p>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <button className="border rounded-lg p-4 flex items-center justify-center text-blue-600 hover:bg-blue-50">
            + Add New Card
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{payment.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.bike}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    •••• {payment.cardLast4}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;