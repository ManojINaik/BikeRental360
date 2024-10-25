import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileCreationForm from './ProfileCreationForm';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (profileData: any) => void;
};

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [signupData, setSignupData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSignupComplete = (data: any) => {
    setSignupData(data);
    setShowProfileCreation(true);
  };

  const handleProfileComplete = (profileData: any) => {
    const completeProfile = {
      ...signupData,
      ...profileData,
      joinDate: new Date().toISOString(),
    };
    onLogin(completeProfile);
  };

  const handleLoginComplete = (loginData: any) => {
    // In a real app, you would validate credentials here
    const dummyProfile = {
      ...loginData,
      name: loginData.email.split('@')[0],
      joinDate: new Date().toISOString(),
    };
    onLogin(dummyProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg w-full max-w-md p-8">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {showProfileCreation ? 'Complete Your Profile' : (isLogin ? 'Welcome Back' : 'Create Account')}
        </h2>

        {showProfileCreation ? (
          <ProfileCreationForm onComplete={handleProfileComplete} />
        ) : isLogin ? (
          <LoginForm onLogin={handleLoginComplete} onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm 
            onComplete={handleSignupComplete}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;