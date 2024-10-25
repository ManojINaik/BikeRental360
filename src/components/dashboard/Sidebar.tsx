import React from 'react';
import { User, Bike, History, CreditCard, Bell, Settings } from 'lucide-react';

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const navItems = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'rentals', icon: Bike, label: 'Active Rentals' },
  { id: 'history', icon: History, label: 'Rental History' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
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
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
              activeTab === id ? 'text-gray-700 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;