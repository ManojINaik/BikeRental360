import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileTab from './tabs/ProfileTab';
import ActiveRentalsTab from './tabs/ActiveRentalsTab';
import RentalHistoryTab from './tabs/RentalHistoryTab';
import PaymentsTab from './tabs/PaymentsTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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