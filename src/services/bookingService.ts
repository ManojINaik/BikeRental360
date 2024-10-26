import axios from 'axios';
import { Booking } from '../types/booking';

const API_URL = '/api/bookings';

export async function createBooking(bookingData: Partial<Booking>): Promise<Booking> {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
}

export async function getBookingById(id: string): Promise<Booking> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
}

export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  const response = await axios.patch(`${API_URL}/${id}/status`, { status });
  return response.data;
}

export async function cancelBooking(id: string): Promise<Booking> {
  const response = await axios.post(`${API_URL}/${id}/cancel`);
  return response.data;
}