import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Settings, Bell, CreditCard, Bike, History, AlertCircle } from 'lucide-react';

type UserDashboardProps = {
  profile: any;
};

type TabType = 'active' | 'history' | 'payments' | 'notifications' | 'settings';

const UserDashboard = ({ profile }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <div className="space-y-6">
            {/* Profile Bio */}
            {profile?.bio && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            )}

            {/* Active Rentals Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Active Rentals</h2>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Bike className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active rentals</p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Browse Bikes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Rental History</h2>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No rental history yet</p>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No payment methods added</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Notifications</h2>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No new notifications</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profile?.location || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <input
                      type="text"
                      value={profile?.experience || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Edit Profile
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-gray-700">SMS notifications</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Account Security</h3>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition duration-300">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                    {profile?.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{profile?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {profile?.location || 'Location not set'}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Rider Profile</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Experience: {profile?.experience || 'Not specified'}</p>
                  <p>Preferred Bikes: {profile?.preferredBikeTypes?.join(', ') || 'Not specified'}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                    activeTab === 'active' ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bike className="h-5 w-5" />
                  <span>Active Rentals</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                    activeTab === 'history' ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <History className="h-5 w-5" />
                  <span>Rental History</span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                    activeTab === 'payments' ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                    activeTab === 'notifications' ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                    activeTab === 'settings' ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;