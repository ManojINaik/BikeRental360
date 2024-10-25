import React from 'react';
import { Shield, Key, Globe, Trash2 } from 'lucide-react';

const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Security Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Key className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">Protect your account with 2FA security. When enabled, you'll be required to enter an additional code when logging in.</p>
            <p className="text-sm text-gray-500 mt-1">Status: Not enabled</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Language & Region</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Trash2 className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold">Delete Account</h2>
        </div>

        <div>
          <p className="text-gray-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;