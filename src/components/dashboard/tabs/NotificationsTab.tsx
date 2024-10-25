import React from 'react';
import { Bell, Settings, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const NotificationsTab = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>

        {/* Show when no notifications */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
          <p className="text-gray-500 mb-4">You're all caught up! Check back later for updates.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <Settings className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Push Notifications</span>
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">SMS Notifications</span>
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;