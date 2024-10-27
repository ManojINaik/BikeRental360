import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileTab from './tabs/ProfileTab';
import ActiveRentalsTab from './tabs/ActiveRentalsTab';
import RentalHistoryTab from './tabs/RentalHistoryTab';
import PaymentsTab from './tabs/PaymentsTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

type UserDashboardProps = {
  onClose: () => void;
};

const UserDashboard = ({ onClose }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { currentUser } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={currentUser} />;
      case 'rentals':
        return <ActiveRentalsTab />;
      case 'history':
        return <RentalHistoryTab />;
      case 'payments':
        return <PaymentsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5 mr-1" />
            Close Dashboard
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} user={currentUser} />
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;