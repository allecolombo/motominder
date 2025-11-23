/**
 * AuthContext
 * Global authentication state management using React Context
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

import { AuthContextType, User } from '@types';
import { getFirebaseErrorMessage } from '@utils';
import {
  auth,
  firestore,
  registerWithEmail as firebaseRegister,
  loginWithEmail as firebaseLogin,
  logout as firebaseLogout,
  sendPasswordReset as firebaseSendPasswordReset,
  getUserDocument,
  updateUserDocument,
} from '@services/firebase';

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: '@motominder:user',
};

/**
 * AuthProvider Component
 * Wraps the app and provides authentication state
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize auth state listener
   * Listens to Firebase auth state changes and persists user data
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(firestore, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let userDoc: User;

          // If user document doesn't exist, create it
          if (!userSnap.exists()) {
            console.log('User document not found on auth state change, creating...');
            const now = Timestamp.now();
            const userData: any = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || 'User',
              createdAt: now,
              lastLoginAt: now,
              isPremium: false,
              preferences: {
                notificationDays: [30, 15, 7],
                theme: 'dark',
                language: 'it',
              },
            };

            // Only add photoURL if it exists
            if (firebaseUser.photoURL) {
              userData.photoURL = firebaseUser.photoURL;
            }

            await setDoc(userRef, userData);
            userDoc = userData as User;
          } else {
            // Fetch existing user document
            userDoc = await getUserDocument(firebaseUser.uid);
          }

          setUser(userDoc);

          // Persist user data
          await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userDoc));
        } catch (error: any) {
          console.error('Error fetching user document:', error);
          setError('Errore nel caricamento dei dati utente');
        }
      } else {
        // User signed out
        setUser(null);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  /**
   * Load persisted user data on app start
   */
  useEffect(() => {
    const loadPersistedUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        if (userJson) {
          const persistedUser = JSON.parse(userJson);
          setUser(persistedUser);
        }
      } catch (error) {
        console.error('Error loading persisted user:', error);
      }
    };

    loadPersistedUser();
  }, []);

  /**
   * Register with email and password
   */
  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const newUser = await firebaseRegister(email, password, displayName);
      setUser(newUser);

      // Persist user data
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const loggedInUser = await firebaseLogin(email, password);
      setUser(loggedInUser);

      // Persist user data
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser));
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await firebaseLogout();
      setUser(null);

      // Clear persisted data
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset email
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await firebaseSendPasswordReset(email);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile
   */
  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      setLoading(true);
      setError(null);

      await updateUserDocument(user.uid, data);

      // Update local state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      // Persist updated data
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 * Custom hook to access AuthContext
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
