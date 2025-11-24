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
  addDoc,
} from 'firebase/firestore';

import { firestore } from './config';
import { Moto, MotoCreationData, MotoUpdateData, OdometerReading } from '@types';

// Collection names
const MOTOS_COLLECTION = 'motos';
const ODOMETER_LOG_COLLECTION = 'odometerLog';

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

    // Check if this is the user's first moto
    const userMotos = await getUserMotos(userId);
    const isFirstMoto = userMotos.length === 0;

    // Create moto document
    const moto: Moto = {
      id: motoId,
      userId,
      ...motoData,
      addedAt: now,
      updatedAt: now,
      isPrimary: isFirstMoto, // First moto is automatically primary
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
    // Query without orderBy to avoid requiring composite index
    // Sorting is done client-side instead
    const q = query(motosRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);

    const motos: Moto[] = [];
    querySnapshot.forEach((doc) => {
      motos.push(doc.data() as Moto);
    });

    // Sort client-side by addedAt descending
    motos.sort((a, b) => {
      const aTime = a.addedAt?.toMillis() || 0;
      const bTime = b.addedAt?.toMillis() || 0;
      return bTime - aTime; // descending order (newest first)
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

/**
 * Log an odometer reading
 */
export const logOdometerReading = async (
  userId: string,
  motoId: string,
  km: number
): Promise<OdometerReading> => {
  try {
    const now = Timestamp.now();

    const reading: Omit<OdometerReading, 'id'> = {
      motoId,
      userId,
      km,
      date: now,
    };

    // Save to odometerLog collection
    const docRef = await addDoc(collection(firestore, ODOMETER_LOG_COLLECTION), reading);

    console.log(`✅ Odometer reading logged: ${km} km for moto ${motoId}`);

    return {
      id: docRef.id,
      ...reading,
    };
  } catch (error: any) {
    console.error('Log odometer reading error:', error);
    throw error;
  }
};

/**
 * Get odometer readings for a moto
 */
export const getOdometerReadings = async (
  motoId: string,
  limit?: number
): Promise<OdometerReading[]> => {
  try {
    const odometerRef = collection(firestore, ODOMETER_LOG_COLLECTION);
    let q = query(
      odometerRef,
      where('motoId', '==', motoId),
      orderBy('date', 'desc')
    );

    // Apply limit if provided
    if (limit) {
      q = query(q, orderBy('date', 'desc'));
    }

    const querySnapshot = await getDocs(q);

    const readings: OdometerReading[] = [];
    querySnapshot.forEach((doc) => {
      readings.push({
        id: doc.id,
        ...doc.data(),
      } as OdometerReading);
    });

    console.log(`✅ Retrieved ${readings.length} odometer readings for moto ${motoId}`);

    return readings;
  } catch (error: any) {
    console.error('Get odometer readings error:', error);
    throw error;
  }
};
