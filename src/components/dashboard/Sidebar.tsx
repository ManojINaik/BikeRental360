import React from 'react';
import { User, Bike, History, CreditCard, Bell, Settings } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: FirebaseUser | null;
};

const navItems = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'rentals', icon: Bike, label: 'Active Rentals' },
  { id: 'history', icon: History, label: 'Rental History' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

const Sidebar = ({ activeTab, onTabChange, user }: SidebarProps) => {
  const joinDate = user?.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`}
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{user?.displayName || 'User'}</h3>
          <p className="text-sm text-gray-500">Member since {joinDate}</p>
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