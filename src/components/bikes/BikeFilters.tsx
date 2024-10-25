import React from 'react';
import { Sliders, ChevronDown } from 'lucide-react';

const BikeFilters = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button className="text-blue-600 text-sm hover:text-blue-700">Reset All</button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bike Type</label>
          <div className="space-y-2">
            {['Sport', 'Cruiser', 'Adventure', 'Touring'].map((type) => (
              <label key={type} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <div className="space-y-2">
            {['Honda', 'Yamaha', 'Kawasaki', 'BMW', 'Ducati'].map((brand) => (
              <label key={brand} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Engine Size</label>
          <div className="space-y-2">
            {['Under 500cc', '500cc-750cc', '750cc-1000cc', 'Over 1000cc'].map((size) => (
              <label key={size} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center">
          <Sliders className="h-4 w-4 mr-2" />
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default BikeFilters;