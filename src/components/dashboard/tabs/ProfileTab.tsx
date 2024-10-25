import React from 'react';
import { Camera, Star, Shield, Bike } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import ProfileForm from '../forms/ProfileForm';
import PreferencesForm from '../forms/PreferencesForm';

type ProfileTabProps = {
  user: FirebaseUser | null;
};

const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative group">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user?.displayName || 'User'}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-gray-600">Verified User</span>
              </div>
              {user?.emailVerified && (
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-1" />
                  <span className="text-gray-600">Email Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProfileForm user={user} />
      <PreferencesForm />
    </div>
  );
};

export default ProfileTab;