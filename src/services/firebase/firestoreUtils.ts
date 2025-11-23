/**
 * Firestore Utility Functions
 * Helper functions for Firestore operations
 */

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

import { firestore } from './config';

const MOTOS_COLLECTION = 'motos';

/**
 * Set a moto as primary and unset all others for this user
 */
export const setPrimaryMoto = async (
  userId: string,
  motoId: string
): Promise<void> => {
  try {
    const motosRef = collection(firestore, MOTOS_COLLECTION);

    // Get all motos for this user
    const q = query(motosRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Update all motos
    const updatePromises = querySnapshot.docs.map(async (motoDoc) => {
      const isPrimary = motoDoc.id === motoId;
      const motoRef = doc(firestore, MOTOS_COLLECTION, motoDoc.id);

      return updateDoc(motoRef, {
        isPrimary,
        updatedAt: Timestamp.now(),
      });
    });

    await Promise.all(updatePromises);

    console.log(`✅ Primary moto set: ${motoId}`);
  } catch (error: any) {
    console.error('Set primary moto error:', error);
    throw error;
  }
};
