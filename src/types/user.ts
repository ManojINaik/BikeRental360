export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}