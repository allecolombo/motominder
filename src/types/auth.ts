/**
 * Authentication Types
 * Types for Firebase Auth and user management
 */

import { Timestamp } from 'firebase/firestore';

/**
 * User Preferences
 */
export interface UserPreferences {
  notificationDays: number[]; // e.g., [30, 15, 7] days before deadline
  theme: 'light' | 'dark';
  language: 'it' | 'en';
}

/**
 * User Document (Firestore)
 * Represents a user in the database
 */
export interface User {
  uid: string; // Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  isPremium: boolean;
  premiumUntil?: Timestamp;
  preferences: UserPreferences;
}

/**
 * User Creation Data
 * Data required to create a new user
 */
export interface UserCreationData {
  email: string;
  displayName: string;
  photoURL?: string;
}

/**
 * Auth Context Type
 * Defines the shape of AuthContext value
 */
export interface AuthContextType {
  // State
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

/**
 * Firebase Auth Error Codes
 * Common Firebase Auth error codes for better error handling
 */
export enum FirebaseAuthError {
  EMAIL_EXISTS = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  WEAK_PASSWORD = 'auth/weak-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  NETWORK_ERROR = 'auth/network-request-failed',
  USER_DISABLED = 'auth/user-disabled',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
}

/**
 * Form Validation Errors
 */
export interface ValidationErrors {
  email?: string;
  password?: string;
  displayName?: string;
  confirmPassword?: string;
}

/**
 * Login Form Data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Register Form Data
 */
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

/**
 * Forgot Password Form Data
 */
export interface ForgotPasswordFormData {
  email: string;
}
