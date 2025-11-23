/**
 * Firebase Authentication Service
 * Handles all authentication operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { auth, firestore } from './config';
import { User, UserCreationData } from '@types';

/**
 * Register with Email and Password
 * Creates Firebase Auth user and Firestore user document
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  try {
    // Create Firebase Auth user
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update profile with display name
    await updateProfile(userCredential.user, { displayName });

    // Create Firestore user document
    const now = Timestamp.now();
    const userData: any = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      displayName,
      createdAt: now,
      lastLoginAt: now,
      isPremium: false,
      preferences: {
        notificationDays: [30, 15, 7], // Default: 30, 15, 7 days before
        theme: 'dark',
        language: 'it',
      },
    };

    // Only add photoURL if it exists (Firestore doesn't accept undefined)
    if (userCredential.user.photoURL) {
      userData.photoURL = userCredential.user.photoURL;
    }

    await setDoc(doc(firestore, 'users', userCredential.user.uid), userData);

    // Return complete user object
    return userData as User;
  } catch (error: any) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * Login with Email and Password
 * Signs in user and updates lastLoginAt
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    // Sign in with Firebase Auth
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userRef = doc(firestore, 'users', userCredential.user.uid);
    const userSnap = await getDoc(userRef);

    // If user document doesn't exist, create it
    // This handles edge case where Auth user exists but Firestore doc doesn't
    if (!userSnap.exists()) {
      console.log('User document not found, creating...');
      const now = Timestamp.now();
      const userData: any = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || 'User',
        createdAt: now,
        lastLoginAt: now,
        isPremium: false,
        preferences: {
          notificationDays: [30, 15, 7],
          theme: 'dark',
          language: 'it',
        },
      };

      // Only add photoURL if it exists (Firestore doesn't accept undefined)
      if (userCredential.user.photoURL) {
        userData.photoURL = userCredential.user.photoURL;
      }

      await setDoc(userRef, userData);
      return userData as User;
    }

    // Update lastLoginAt in existing Firestore document
    await updateDoc(userRef, {
      lastLoginAt: Timestamp.now(),
    });

    // Fetch and return user document
    const user = await getUserDocument(userCredential.user.uid);
    return user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout
 * Signs out the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Send Password Reset Email
 * Sends password reset link to user's email
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw error;
  }
};

/**
 * Get User Document from Firestore
 * Fetches complete user data from Firestore
 */
export const getUserDocument = async (uid: string): Promise<User> => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('User document not found');
    }

    return {
      uid,
      ...userSnap.data(),
    } as User;
  } catch (error: any) {
    console.error('Get user document error:', error);
    throw error;
  }
};

/**
 * Update User Document
 * Updates user data in Firestore
 */
export const updateUserDocument = async (
  uid: string,
  data: Partial<User>
): Promise<void> => {
  try {
    const userRef = doc(firestore, 'users', uid);
    await updateDoc(userRef, data as any);
  } catch (error: any) {
    console.error('Update user document error:', error);
    throw error;
  }
};

/**
 * Update User Profile (Firebase Auth)
 * Updates displayName and/or photoURL in Firebase Auth
 */
export const updateUserProfile = async (
  displayName?: string,
  photoURL?: string
): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user signed in');
    }

    const updates: { displayName?: string; photoURL?: string } = {};
    if (displayName) updates.displayName = displayName;
    if (photoURL) updates.photoURL = photoURL;

    await updateProfile(auth.currentUser, updates);
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw error;
  }
};

/**
 * Get Current Firebase User
 * Returns current Firebase Auth user (not Firestore document)
 */
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
