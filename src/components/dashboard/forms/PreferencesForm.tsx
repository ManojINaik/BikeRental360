import React from 'react';

const PreferencesForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Preferences</h3>
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
          <span className="text-gray-700">Receive email notifications for new messages</span>
        </label>
        <label className="flex items-center space-x-3">
          <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
          <span className="text-gray-700">Receive email notifications for booking updates</span>
        </label>
        <label className="flex items-center space-x-3">
          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
          <span className="text-gray-700">Receive promotional emails and newsletters</span>
        </label>
      </div>
    </div>
  );
};

export default PreferencesForm;