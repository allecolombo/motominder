/**
 * Firestore Moto Service
 * CRUD operations for motorcycles collection
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

import { firestore } from './config';
import { Moto, MotoCreationData, MotoUpdateData } from '@types';

// Collection name
const MOTOS_COLLECTION = 'motos';

/**
 * Add a new moto to Firestore
 */
export const addMoto = async (
  userId: string,
  motoData: MotoCreationData
): Promise<Moto> => {
  try {
    // Generate new document ID
    const motoRef = doc(collection(firestore, MOTOS_COLLECTION));
    const motoId = motoRef.id;

    const now = Timestamp.now();

    // Create moto document
    const moto: Moto = {
      id: motoId,
      userId,
      ...motoData,
      addedAt: now,
      updatedAt: now,
    };

    // Save to Firestore
    await setDoc(motoRef, moto);

    console.log(`✅ Moto added: ${moto.brand} ${moto.model} (${moto.plateNumber})`);

    return moto;
  } catch (error: any) {
    console.error('Add moto error:', error);
    throw error;
  }
};

/**
 * Get a single moto by ID
 */
export const getMoto = async (motoId: string): Promise<Moto> => {
  try {
    const motoRef = doc(firestore, MOTOS_COLLECTION, motoId);
    const motoSnap = await getDoc(motoRef);

    if (!motoSnap.exists()) {
      throw new Error('Moto not found');
    }

    return motoSnap.data() as Moto;
  } catch (error: any) {
    console.error('Get moto error:', error);
    throw error;
  }
};

/**
 * Get all motos for a specific user
 */
export const getUserMotos = async (userId: string): Promise<Moto[]> => {
  try {
    const motosRef = collection(firestore, MOTOS_COLLECTION);
    const q = query(
      motosRef,
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const motos: Moto[] = [];
    querySnapshot.forEach((doc) => {
      motos.push(doc.data() as Moto);
    });

    console.log(`✅ Retrieved ${motos.length} motos for user ${userId}`);

    return motos;
  } catch (error: any) {
    console.error('Get user motos error:', error);
    throw error;
  }
};

/**
 * Update moto data
 */
export const updateMoto = async (
  motoId: string,
  updates: MotoUpdateData
): Promise<void> => {
  try {
    const motoRef = doc(firestore, MOTOS_COLLECTION, motoId);

    // Add updatedAt timestamp
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(motoRef, updateData as any);

    console.log(`✅ Moto updated: ${motoId}`);
  } catch (error: any) {
    console.error('Update moto error:', error);
    throw error;
  }
};

/**
 * Delete a moto
 */
export const deleteMoto = async (motoId: string): Promise<void> => {
  try {
    const motoRef = doc(firestore, MOTOS_COLLECTION, motoId);
    await deleteDoc(motoRef);

    console.log(`✅ Moto deleted: ${motoId}`);
  } catch (error: any) {
    console.error('Delete moto error:', error);
    throw error;
  }
};

/**
 * Check if a plate number is already registered for this user
 */
export const isPlateNumberTaken = async (
  userId: string,
  plateNumber: string
): Promise<boolean> => {
  try {
    const motosRef = collection(firestore, MOTOS_COLLECTION);
    const q = query(
      motosRef,
      where('userId', '==', userId),
      where('plateNumber', '==', plateNumber.toUpperCase())
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error: any) {
    console.error('Check plate number error:', error);
    throw error;
  }
};
