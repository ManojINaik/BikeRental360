import axios from 'axios';
import { Bike } from '../types/bike';

const API_URL = '/api/bikes';

export async function getAllBikes(): Promise<Bike[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getBikeById(id: string): Promise<Bike> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createBike(bikeData: Partial<Bike>): Promise<Bike> {
  const response = await axios.post(API_URL, bikeData);
  return response.data;
}

export async function updateBike(id: string, bikeData: Partial<Bike>): Promise<Bike> {
  const response = await axios.put(`${API_URL}/${id}`, bikeData);
  return response.data;
}

export async function deleteBike(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

export async function searchBikes(params: {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}): Promise<Bike[]> {
  const response = await axios.get(API_URL, { params });
  return response.data;
}