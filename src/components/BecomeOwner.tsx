import React from 'react';
import { DollarSign, Users, Shield, Clock } from 'lucide-react';

type BecomeOwnerProps = {
  onGetStarted: () => void;
};

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn Extra Income',
    description: 'Turn your motorcycle into a money-making asset. Our owners earn an average of $500 per month.'
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Connect with fellow motorcycle enthusiasts and build lasting relationships.'
  },
  {
    icon: Shield,
    title: 'Full Insurance Coverage',
    description: 'Your bike is protected with our comprehensive insurance policy during rentals.'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'You decide when your bike is available. Maintain full control over your schedule.'
  }
];

const BecomeOwner = ({ onGetStarted }: BecomeOwnerProps) => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Bike Owner</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          List your motorcycle and start earning money today. Join our community of owners and riders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <benefit.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onGetStarted}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Get Started as an Owner
        </button>
      </div>
    </div>
  );
};

export default BecomeOwner;