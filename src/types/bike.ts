export interface Bike {
  id: string;
  name: string;
  type: 'Cruiser' | 'Sport' | 'Adventure' | 'Touring' | 'Cafe Racer' | 'Scooter';
  location: string;
  price: number;
  description?: string;
  features: string[];
  imageUrl?: string;
  status: 'available' | 'rented' | 'maintenance';
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}