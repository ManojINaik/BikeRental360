import React from 'react';
import { Camera, Star, Shield, Bike } from 'lucide-react';
import ProfileForm from '../forms/ProfileForm';
import PreferencesForm from '../forms/PreferencesForm';

const ProfileTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-500">San Francisco, CA</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-gray-600">4.9 Rating</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-gray-600">Verified Rider</span>
              </div>
              <div className="flex items-center">
                <Bike className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-gray-600">23 Rides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileForm />
      <PreferencesForm />
    </div>
  );
};

export default ProfileTab;