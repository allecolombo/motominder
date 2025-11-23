/**
 * Firebase Configuration
 * Initializes Firebase app with environment variables
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration from environment variables
// In Expo, env vars must be prefixed with EXPO_PUBLIC_ to be accessible
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missingFields = requiredFields.filter(
    (field) => !firebaseConfig[field as keyof typeof firebaseConfig]
  );

  if (missingFields.length > 0) {
    console.warn(
      `⚠️ Firebase configuration incomplete. Missing: ${missingFields.join(', ')}\n` +
        'Please create a .env file with your Firebase credentials.\n' +
        'See .env.example for reference.'
    );
    return false;
  }

  return true;
};

// Initialize Firebase (only once)
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let storage: FirebaseStorage;

const initializeFirebase = () => {
  // Check if Firebase is already initialized
  if (getApps().length > 0) {
    firebaseApp = getApps()[0];
  } else {
    // Validate configuration before initialization
    const isValid = validateFirebaseConfig();
    if (!isValid) {
      throw new Error(
        'Firebase configuration is incomplete. Please check your .env file.'
      );
    }

    // Initialize Firebase
    firebaseApp = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
  }

  // Initialize services
  // Initialize Auth with AsyncStorage persistence for React Native
  try {
    auth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error: any) {
    // If auth is already initialized, just get the instance
    if (error.code === 'auth/already-initialized') {
      auth = getAuth(firebaseApp);
    } else {
      throw error;
    }
  }

  firestore = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
};

// Initialize on module load
try {
  initializeFirebase();
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

// Export Firebase services
export { firebaseApp, auth, firestore, storage };
