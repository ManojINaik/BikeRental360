import React, { useEffect, useState } from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

type BikeGridProps = {
  onBookNowClick: () => void;
};

const bikes = [
  {
    id: 1,
    name: 'Royal Enfield Classic 350',
    type: 'Cruiser',
    location: 'Bengaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 799,
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: 'KTM Duke 390',
    type: 'Sport',
    location: 'Mysuru, Karnataka',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1199,
    rating: 4.8,
    reviews: 96
  },
  {
    id: 3,
    name: 'Bajaj Dominar 400',
    type: 'Sports Tourer',
    location: 'Mangaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 999,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: 'Honda CB350',
    type: 'Modern Classic',
    location: 'Hubballi, Karnataka',
    image: 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 899,
    rating: 4.7,
    reviews: 84
  }
];

const BikeGrid = ({ onBookNowClick }: BikeGridProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
                <span className="text-2xl font-bold text-blue-600">₹{bike.price}</span>
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