/**
 * Central export for Firebase services
 */

export { auth, firestore, storage, firebaseApp } from './config';

export {
  registerWithEmail,
  loginWithEmail,
  logout,
  sendPasswordReset,
  getUserDocument,
  updateUserDocument,
  updateUserProfile,
  getCurrentFirebaseUser,
} from './auth';

export {
  addMoto,
  getMoto,
  getUserMotos,
  updateMoto,
  deleteMoto,
  isPlateNumberTaken,
} from './firestore';
