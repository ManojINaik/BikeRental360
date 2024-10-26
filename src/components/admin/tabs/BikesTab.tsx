import React, { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { getAllBikes, deleteBike } from '../../../services/bikeService';
import { Bike } from '../../../types/bike';
import AddBikeModal from '../modals/AddBikeModal';

const BikesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const bikesList = await getAllBikes();
      setBikes(bikesList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bikes:', err);
      setError('Failed to load bikes');
      setLoading(false);
    }
  };

  const handleDeleteBike = async (bikeId: string) => {
    if (!window.confirm('Are you sure you want to delete this bike?')) return;

    try {
      await deleteBike(bikeId);
      await fetchBikes();
      setError('');
    } catch (err) {
      console.error('Error deleting bike:', err);
      setError('Failed to delete bike');
    }
  };

  const filteredBikes = bikes.filter(bike => 
    bike.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Bikes Management</h2>
          <button 
            onClick={() => {
              setEditingBike(null);
              setShowAddModal(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Bike
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBikes.map((bike) => (
              <tr key={bike.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {bike.imageUrl && (
                      <img 
                        src={bike.imageUrl} 
                        alt={bike.name}
                        className="h-10 w-10 rounded-md object-cover mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">{bike.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{bike.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{bike.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bike.status === 'available' ? 'bg-green-100 text-green-800' :
                    bike.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bike.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{bike.price}/day</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setEditingBike(bike);
                        setShowAddModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteBike(bike.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredBikes.length} of {bikes.length} bikes
          </div>
        </div>
      </div>

      <AddBikeModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingBike(null);
          setError('');
        }}
        onAdd={async (bikeData) => {
          await fetchBikes();
        }}
        onEdit={async (id, bikeData) => {
          await fetchBikes();
        }}
        editingBike={editingBike}
      />
    </div>
  );
};

export default BikesTab;