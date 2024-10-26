import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import AddUserModal from '../modals/AddUserModal';
import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, getAuth, listUsers } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const UsersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  const db = getFirestore();
  const functions = getFunctions();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Create a Cloud Function to list users since client-side can't directly list Firebase Auth users
      const listAllUsers = httpsCallable(functions, 'listUsers');
      const result = await listAllUsers();
      const firebaseUsers = result.data as any[];

      // Get additional user data from Firestore
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      const firestoreUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Merge Firebase Auth users with Firestore data
      const mergedUsers = firebaseUsers.map(authUser => {
        const firestoreUser = firestoreUsers.find(user => user.uid === authUser.uid);
        return {
          ...authUser,
          ...firestoreUser,
          id: authUser.uid,
          status: firestoreUser?.status || 'Active',
          role: firestoreUser?.role || 'User'
        };
      });

      setUsers(mergedUsers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please make sure you have the necessary permissions.');
      setLoading(false);
    }
  };

  const handleAddUser = async (userData: any) => {
    try {
      // Check if email already exists in Firestore
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', userData.email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        throw new Error('A user with this email already exists');
      }

      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: userData.name
      });

      // Add to Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      });

      // Refresh user list
      await fetchUsers();
      setShowAddModal(false);
      setError('');
    } catch (err: any) {
      let errorMessage = 'Failed to add user';
      
      if (err.code === 'auth/email-already-in-use' || err.message === 'A user with this email already exists') {
        errorMessage = 'This email address is already registered. Please use a different email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleEditUser = async (userId: string, updatedData: any) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, updatedData);
      
      // Refresh user list
      await fetchUsers();
      setEditingUser(null);
      setError('');
    } catch (err) {
      const errorMessage = 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      // Create a Cloud Function to delete the Firebase Auth user
      const deleteUserFunction = httpsCallable(functions, 'deleteUser');
      await deleteUserFunction({ uid: userId });

      // Delete from Firestore
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);

      // Refresh user list
      await fetchUsers();
      setError('');
    } catch (err) {
      const errorMessage = 'Failed to delete user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Users Management</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add New User
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
              placeholder="Search users..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.name} 
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium">
                          {user.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
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
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      <AddUserModal 
        isOpen={showAddModal} 
        onClose={() => {
          setShowAddModal(false);
          setError('');
        }}
        onAdd={handleAddUser}
        editingUser={editingUser}
        onEdit={handleEditUser}
        error={error}
      />
    </div>
  );
};

export default UsersTab;