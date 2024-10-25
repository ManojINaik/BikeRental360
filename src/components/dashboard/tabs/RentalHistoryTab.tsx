import React from 'react';
import { Bike, Star } from 'lucide-react';

const rentals = [
  {
    id: 1,
    bike: 'BMW R nineT',
    date: 'Mar 10, 2024',
    duration: '3 days',
    location: 'San Francisco, CA',
    rating: 5,
    cost: '$417'
  },
  {
    id: 2,
    bike: 'Ducati Monster',
    date: 'Feb 28, 2024',
    duration: '2 days',
    location: 'Los Angeles, CA',
    rating: 4,
    cost: '$238'
  },
  {
    id: 3,
    bike: 'Triumph Street Triple',
    date: 'Feb 15, 2024',
    duration: '4 days',
    location: 'Miami, FL',
    rating: 5,
    cost: '$396'
  }
];

const RentalHistoryTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Rental History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Bike className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{rental.bike}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="ml-1 text-sm text-gray-900">{rental.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rental.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalHistoryTab;