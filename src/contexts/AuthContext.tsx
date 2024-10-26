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
  setPersistence,
  AuthError
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
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const handleAuthError = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please use a different email or sign in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups or try another sign-in method.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in window was closed. Please try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
          setIsAdmin(result.user.email === 'naik97059@gmail.com');
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdmin(user?.email === 'naik97059@gmail.com');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setIsAdmin(result.user.email === 'naik97059@gmail.com');
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setIsAdmin(result.user.email === 'naik97059@gmail.com');
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase auth not initialized');
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      throw new Error(handleAuthError(error as AuthError));
    }
  };

  const signInWithGoogle = async (useRedirect = false) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        setIsAdmin(result.user.email === 'naik97059@gmail.com');
      }
    } catch (error) {
      if ((error as AuthError).code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider);
      } else {
        throw new Error(handleAuthError(error as AuthError));
      }
    }
  };

  const signInWithGithub = async (useRedirect = false) => {
    if (!auth) throw new Error('Firebase auth not initialized');
    const provider = new GithubAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      
      if (useRedirect) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        setIsAdmin(result.user.email === 'naik97059@gmail.com');
      }
    } catch (error) {
      if ((error as AuthError).code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider);
      } else {
        throw new Error(handleAuthError(error as AuthError));
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
    signInWithGithub,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};