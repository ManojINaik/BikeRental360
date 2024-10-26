import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

type BikeGridProps = {
  onBookNowClick: () => void;
};

const bikes = [
  {
    id: 1,
    name: 'Harley-Davidson Iron 883',
    type: 'Cruiser',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 89,
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: 'Ducati Monster',
    type: 'Sport',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 119,
    rating: 4.8,
    reviews: 96
  },
  {
    id: 3,
    name: 'BMW R nineT',
    type: 'Modern Classic',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 139,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: 'Triumph Street Triple',
    type: 'Sport',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 99,
    rating: 4.7,
    reviews: 84
  }
];

const BikeGrid = ({ onBookNowClick }: BikeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <div key={bike.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48">
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-medium text-gray-700">
              {bike.type}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{bike.name}</h3>
            
            <div className="flex items-center mb-4">
              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">{bike.location}</span>
            </div>

            <div className="flex items-center mb-4">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">{bike.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({bike.reviews} reviews)</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-blue-600">${bike.price}</span>
                <span className="text-gray-500">/day</span>
              </div>
              <button 
                onClick={onBookNowClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BikeGrid;