import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Bike {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  description?: string;
  features?: string[];
  imageUrl?: string;
  status: 'available' | 'rented' | 'maintenance';
  rating: number;
  reviewsCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BIKES_COLLECTION = 'bikes';

export async function getAllBikes(): Promise<Bike[]> {
  const bikesRef = collection(db, BIKES_COLLECTION);
  const q = query(bikesRef, where('status', '==', 'available'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bike));
}

export async function getBikeById(id: string): Promise<Bike | null> {
  const bikeRef = doc(db, BIKES_COLLECTION, id);
  const snapshot = await getDocs(query(collection(db, BIKES_COLLECTION), where('__name__', '==', id)));
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Bike;
}

export async function searchBikes(params: {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Bike[]> {
  let q = query(collection(db, BIKES_COLLECTION), where('status', '==', 'available'));

  if (params.type) {
    q = query(q, where('type', '==', params.type));
  }

  if (params.location) {
    q = query(q, where('location', '==', params.location));
  }

  const snapshot = await getDocs(q);
  let bikes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bike));

  if (params.minPrice !== undefined) {
    bikes = bikes.filter(bike => bike.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    bikes = bikes.filter(bike => bike.price <= params.maxPrice!);
  }

  return bikes;
}

export async function createBike(bike: Omit<Bike, 'id' | 'rating' | 'reviewsCount'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, BIKES_COLLECTION), {
      ...bike,
      rating: 0,
      reviewsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error: any) {
    console.error('Error creating bike:', error);
    throw new Error(error.message || 'Failed to create bike');
  }
}

export async function updateBike(id: string, bike: Partial<Bike>): Promise<void> {
  try {
    const bikeRef = doc(db, BIKES_COLLECTION, id);
    await updateDoc(bikeRef, {
      ...bike,
      updatedAt: new Date()
    });
  } catch (error: any) {
    console.error('Error updating bike:', error);
    throw new Error(error.message || 'Failed to update bike');
  }
}

export async function deleteBike(id: string): Promise<void> {
  try {
    const bikeRef = doc(db, BIKES_COLLECTION, id);
    await deleteDoc(bikeRef);
  } catch (error: any) {
    console.error('Error deleting bike:', error);
    throw new Error(error.message || 'Failed to delete bike');
  }
}