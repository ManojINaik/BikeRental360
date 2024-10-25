import React from 'react';
import { Star, Clock, Shield } from 'lucide-react';

type FeaturedBikesProps = {
  onBookNowClick: () => void;
};

const bikes = [
  {
    id: 1,
    name: 'Harley-Davidson Iron 883',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 89,
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: 'Ducati Monster',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 119,
    rating: 4.8,
    reviews: 96
  },
  {
    id: 3,
    name: 'BMW R nineT',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 139,
    rating: 4.9,
    reviews: 156
  }
];

const FeaturedBikes = ({ onBookNowClick }: FeaturedBikesProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Bikes</h2>
          <p className="text-lg text-gray-600">Discover our most popular motorcycles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <div key={bike.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{bike.name}</h3>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="ml-1 text-gray-700">{bike.rating}</span>
                  <span className="ml-1 text-gray-500">({bike.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-blue-600 font-bold">
                    ${bike.price}
                    <span className="text-gray-500 font-normal">/day</span>
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
            <p className="text-gray-600">All rentals come with comprehensive insurance coverage</p>
          </div>
          <div className="p-6">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for peace of mind</p>
          </div>
          <div className="p-6">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600">We match any competitor's price for the same bike</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;