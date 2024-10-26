import axios from 'axios';
import { User } from '../types/user';

const API_URL = '/api/users';

export async function getAllUsers(): Promise<User[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const response = await axios.post(API_URL, userData);
  return response.data;
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

export async function searchUsers(params: {
  query?: string;
  role?: string;
  status?: string;
}): Promise<User[]> {
  const response = await axios.get(API_URL, { params });
  return response.data;
}