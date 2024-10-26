export interface Booking {
  id: string;
  user: string;
  bike: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}