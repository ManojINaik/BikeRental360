import React from 'react';
import { Search, Calendar, Key, Shield } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find Your Perfect Bike',
    description: 'Browse our extensive collection of motorcycles and find the one that matches your style and needs.'
  },
  {
    icon: Calendar,
    title: 'Choose Your Dates',
    description: 'Select your preferred pickup and return dates. Flexible duration options available.'
  },
  {
    icon: Key,
    title: 'Book Instantly',
    description: 'Secure your reservation instantly with our easy booking process. No hidden fees.'
  },
  {
    icon: Shield,
    title: 'Ride Safely',
    description: 'All rentals include insurance coverage and 24/7 roadside assistance for peace of mind.'
  }
];

const HowItWorks = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Renting a motorcycle has never been easier. Follow these simple steps to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;