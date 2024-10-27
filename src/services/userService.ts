import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';

export interface DBUser {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const USERS_COLLECTION = 'users';

export async function createUser(firebaseUser: User, additionalData?: Partial<DBUser>): Promise<string> {
  const docRef = await addDoc(collection(db, USERS_COLLECTION), {
    firebaseUid: firebaseUser.uid,
    name: firebaseUser.displayName || additionalData?.name || '',
    email: firebaseUser.email || '',
    phone: firebaseUser.phoneNumber || additionalData?.phone || '',
    role: additionalData?.role || 'user',
    status: additionalData?.status || 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return docRef.id;
}

export async function getAllUsers(): Promise<DBUser[]> {
  const snapshot = await getDocs(collection(db, USERS_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DBUser));
}

export async function getUserByFirebaseUid(firebaseUid: string): Promise<DBUser | null> {
  const q = query(collection(db, USERS_COLLECTION), where('firebaseUid', '==', firebaseUid));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as DBUser;
}

export async function updateUser(id: string, data: Partial<DBUser>): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, id);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date()
  });
}

export async function deleteUser(id: string): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, id);
  await deleteDoc(userRef);
}

export async function searchUsers(params: {
  query?: string;
  role?: string;
  status?: string;
}): Promise<DBUser[]> {
  let q = query(collection(db, USERS_COLLECTION));

  if (params.role) {
    q = query(q, where('role', '==', params.role));
  }

  if (params.status) {
    q = query(q, where('status', '==', params.status));
  }

  const snapshot = await getDocs(q);
  let users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DBUser));

  // Client-side filtering for text search
  if (params.query) {
    const searchTerm = params.query.toLowerCase();
    users = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  return users;
}