import React, { useState } from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';

type ProfileCreationFormProps = {
  onComplete: (data: any) => void;
};

const ProfileCreationForm = ({ onComplete }: ProfileCreationFormProps) => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    birthdate: '',
    profileImage: '',
    preferredBikeTypes: [] as string[],
    experience: 'beginner'
  });

  const bikeTypes = ['Sport', 'Cruiser', 'Adventure', 'Touring', 'Cafe Racer'];
  const experienceLevels = ['beginner', 'intermediate', 'advanced', 'expert'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBikeTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      preferredBikeTypes: prev.preferredBikeTypes.includes(type)
        ? prev.preferredBikeTypes.filter(t => t !== type)
        : [...prev.preferredBikeTypes, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
          </div>
          <p className="text-sm text-gray-500">Click to upload your profile picture</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about yourself and your riding experience"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your city and state"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Preferred Bike Types</label>
        <div className="grid grid-cols-2 gap-2">
          {bikeTypes.map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.preferredBikeTypes.includes(type)}
                onChange={() => handleBikeTypeChange(type)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Riding Experience</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {experienceLevels.map(level => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Complete Profile
      </button>
    </form>
  );
};

export default ProfileCreationForm;