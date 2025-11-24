/**
 * Moto Types
 * Types for motorcycle management and vehicle data
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Deadline Types
 */
export type DeadlineType = 'bollo' | 'revisione' | 'assicurazione' | 'tagliando';

/**
 * Bollo (Road Tax) Deadline
 */
export interface BolloDeadline {
  expiryDate: Date;
  amount: number; // Amount in €
  isPaid: boolean;
}

/**
 * Revisione (Vehicle Inspection) Deadline
 */
export interface RevisioneDeadline {
  expiryDate: Date;
  lastRevisionDate?: Date;
}

/**
 * Assicurazione (Insurance) Deadline
 */
export interface AssicurazioneDeadline {
  expiryDate: Date;
  company?: string;
  policyNumber?: string;
}

/**
 * Tagliando (Service) Deadline
 */
export interface TagliandoDeadline {
  nextKm: number; // Next service at X km
  intervalKm: number; // Service interval (e.g., 12000 km)
  lastServiceDate?: Date;
  lastServiceKm?: number;
}

/**
 * All Deadlines
 */
export interface Deadlines {
  bollo?: BolloDeadline;
  revisione?: RevisioneDeadline;
  assicurazione?: AssicurazioneDeadline;
  tagliando?: TagliandoDeadline;
}

/**
 * Moto Document (Firestore)
 * Represents a motorcycle in the database
 */
export interface Moto {
  id: string;
  userId: string; // Reference to user who owns this moto
  plateNumber: string; // License plate (uppercase, no spaces)
  brand: string; // Brand (Ducati, BMW, Honda, etc.)
  model: string; // Model (Monster 821, R1250GS, etc.)
  year: number; // Registration year
  displacement: number; // Engine displacement (cc)
  power: number; // Power (HP/CV)
  currentKm: number; // Current mileage
  addedAt: Timestamp;
  updatedAt: Timestamp;
  isPrimary: boolean; // Is this the user's primary/main motorcycle?

  // Optional fields
  nickname?: string; // Custom name ("La Bestia")
  photoURL?: string; // Photo of the motorcycle
  notes?: string;

  // Deadlines
  deadlines?: Deadlines;
}

/**
 * Vehicle Data from API
 * Data returned from vehicle verification API (OpenAPI.it)
 */
export interface VehicleData {
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  power: number;
  revisionExpiry?: Date;
  bolloAmount?: number;
}

/**
 * Moto Creation Data
 * Data required to create a new moto
 */
export interface MotoCreationData {
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  power: number;
  currentKm: number;
  nickname?: string;
  photoURL?: string;
  notes?: string;
  deadlines?: Deadlines;
}

/**
 * Moto Update Data
 * Data that can be updated in an existing moto
 */
export interface MotoUpdateData {
  nickname?: string;
  currentKm?: number;
  photoURL?: string;
  notes?: string;
  deadlines?: Deadlines;
  isPrimary?: boolean;
}

/**
 * Vehicle API Error Types
 */
export enum VehicleAPIError {
  PLATE_NOT_FOUND = 'vehicle/plate-not-found',
  INVALID_PLATE = 'vehicle/invalid-plate',
  API_ERROR = 'vehicle/api-error',
  NETWORK_ERROR = 'vehicle/network-error',
  TIMEOUT = 'vehicle/timeout',
  RATE_LIMIT = 'vehicle/rate-limit',
}

/**
 * Odometer Reading
 * Logged km reading for a motorcycle
 */
export interface OdometerReading {
  id: string;
  motoId: string; // Reference to moto
  userId: string;
  km: number; // Odometer reading
  date: Timestamp;
  photoURL?: string; // Optional: photo of odometer
  notes?: string; // Optional: notes about this reading
}
