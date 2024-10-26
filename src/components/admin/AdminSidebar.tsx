import React from 'react';
import { Users, Bike, Calendar, BarChart2, Settings } from 'lucide-react';

type AdminSidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const navItems = [
  { id: 'users', icon: Users, label: 'Users Management' },
  { id: 'bikes', icon: Bike, label: 'Bikes Management' },
  { id: 'bookings', icon: Calendar, label: 'Bookings' },
  { id: 'reports', icon: BarChart2, label: 'Reports & Analytics' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <nav className="space-y-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
              activeTab === id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-100'
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

export default AdminSidebar;