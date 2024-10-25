import React from 'react';
import { Bell, MessageSquare, Calendar, Settings, AlertCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from bike owner',
    description: 'Hey! Just wanted to confirm your pickup time tomorrow.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'booking',
    title: 'Booking confirmed',
    description: 'Your booking for the Ducati Monster has been confirmed.',
    time: '1 day ago',
    read: true
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Upcoming rental',
    description: 'Your rental of BMW R nineT starts tomorrow at 10:00 AM.',
    time: '2 days ago',
    read: true
  },
  {
    id: 4,
    type: 'system',
    title: 'Security alert',
    description: 'New login detected from San Francisco, CA.',
    time: '3 days ago',
    read: true
  }
];

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button className="text-blue-600 text-sm hover:text-blue-700">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {notification.type === 'message' && <MessageSquare className="h-6 w-6 text-blue-500" />}
                  {notification.type === 'booking' && <Calendar className="h-6 w-6 text-green-500" />}
                  {notification.type === 'reminder' && <Bell className="h-6 w-6 text-yellow-500" />}
                  {notification.type === 'system' && <AlertCircle className="h-6 w-6 text-red-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                </div>
              </div>
            </div>
          ))}
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
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
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