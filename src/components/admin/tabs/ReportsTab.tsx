import React from 'react';
import { TrendingUp, Users, Bike, DollarSign } from 'lucide-react';

const ReportsTab = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹1,25,000', icon: DollarSign, change: '+12.5%', positive: true },
    { title: 'Active Users', value: '250', icon: Users, change: '+8.2%', positive: true },
    { title: 'Total Bookings', value: '450', icon: Bike, change: '+15.3%', positive: true },
    { title: 'Average Rating', value: '4.8/5', icon: TrendingUp, change: '+2.1%', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.positive ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Revenue chart will be implemented here</p>
        </div>
      </div>

      {/* Popular Bikes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Most Popular Bikes</h3>
        <div className="space-y-4">
          {[
            { name: 'Royal Enfield Classic 350', bookings: 45, revenue: '₹35,000' },
            { name: 'KTM Duke 390', bookings: 38, revenue: '₹42,000' },
            { name: 'Bajaj Dominar 400', bookings: 32, revenue: '₹38,000' },
          ].map((bike, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{bike.name}</p>
                <p className="text-sm text-gray-500">{bike.bookings} bookings</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{bike.revenue}</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;