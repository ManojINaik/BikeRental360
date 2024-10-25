import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: (useRedirect?: boolean) => Promise<void>;
  signInWithGithub: (useRedirect?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setCurrentUser(result.user);
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    await setPersistence(auth, browserLocalPersistence);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase auth not initialized');
    await signOut(auth);
  };

  const signInWithGoogle = async (useRedirect = false) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence);
    
    try {
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        // If popup is blocked, fall back to redirect
        await signInWithRedirect(auth, provider);
      } else {
        throw error;
      }
    }
  };

  const signInWithGithub = async (useRedirect = false) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    const provider = new GithubAuthProvider();
    await setPersistence(auth, browserLocalPersistence);
    
    try {
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        // If popup is blocked, fall back to redirect
        await signInWithRedirect(auth, provider);
      } else {
        throw error;
      }
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};