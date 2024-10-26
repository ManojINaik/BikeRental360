import React from 'react';
import { Calendar, Clock, MapPin, Settings, Bell, CreditCard, Bike, History } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">Member since 2024</p>
                </div>
              </div>

              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                  <Bike className="h-5 w-5" />
                  <span>Active Rentals</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  <History className="h-5 w-5" />
                  <span>Rental History</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active Rental */}
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

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Bike className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Completed Rental</h4>
                        <p className="text-sm text-gray-500">BMW R nineT • 3 days</p>
                      </div>
                    </div>
                    <span className="text-gray-500">Mar {10 - item}, 2024</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;