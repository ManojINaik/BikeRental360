import React from 'react';
import { TrendingUp, Users, Bike, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

const ReportsTab = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹1,25,000', icon: DollarSign, change: '+12.5%', positive: true },
    { title: 'Active Users', value: '250', icon: Users, change: '+8.2%', positive: true },
    { title: 'Total Bookings', value: '450', icon: Bike, change: '+15.3%', positive: true },
    { title: 'Average Rating', value: '4.8/5', icon: TrendingUp, change: '+2.1%', positive: true },
  ];

  const popularBikes = [
    { name: 'Royal Enfield Classic 350', bookings: 45, revenue: '₹35,000', trend: '+12%' },
    { name: 'KTM Duke 390', bookings: 38, revenue: '₹42,000', trend: '+8%' },
    { name: 'Bajaj Dominar 400', bookings: 32, revenue: '₹38,000', trend: '+5%' },
  ];

  const recentBookings = [
    { date: '2024-03-15', count: 25 },
    { date: '2024-03-16', count: 30 },
    { date: '2024-03-17', count: 28 },
    { date: '2024-03-18', count: 35 },
    { date: '2024-03-19', count: 32 },
    { date: '2024-03-20', count: 40 },
    { date: '2024-03-21', count: 38 },
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
            <div className="mt-4 flex items-center">
              {stat.positive ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {recentBookings.map((booking, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(booking.count / 40) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">
                {new Date(booking.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Bikes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Most Popular Bikes</h3>
        <div className="space-y-4">
          {popularBikes.map((bike, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{bike.name}</p>
                <p className="text-sm text-gray-500">{bike.bookings} bookings</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{bike.revenue}</p>
                <p className="text-sm text-green-600">{bike.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">User Demographics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">18-24 years</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">25-34 years</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">35-44 years</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">20%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Rental Duration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">1-3 days</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">4-7 days</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">8+ days</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <span className="text-gray-900 font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;