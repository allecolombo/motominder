/**
 * Vehicle API Service
 * Fetches vehicle data from license plate
 *
 * IMPLEMENTATION: Mock service for development/testing
 * TODO: Replace with real OpenAPI.it integration when ready
 */

import { VehicleData, VehicleAPIError } from '@types';

// Configuration flag - change to 'REAL' when OpenAPI.it key is available
const API_MODE: 'MOCK' | 'REAL' = 'MOCK';

// OpenAPI.it endpoint (when using real API)
const OPENAPI_BASE_URL = 'https://api.openapi.it/veicoli';

// Get API key from environment
const OPENAPI_KEY = process.env.EXPO_PUBLIC_OPENAPI_KEY;

/**
 * Mock database of vehicles for testing
 * These simulate real API responses
 */
const MOCK_VEHICLES: Record<string, Omit<VehicleData, 'plateNumber'>> = {
  // Ducati Monster 821
  AB123CD: {
    brand: 'Ducati',
    model: 'Monster 821',
    year: 2018,
    displacement: 821,
    power: 109,
    revisionExpiry: new Date('2026-05-15'),
    bolloAmount: 175,
  },
  // BMW R1250GS
  EF456GH: {
    brand: 'BMW',
    model: 'R1250GS',
    year: 2020,
    displacement: 1254,
    power: 136,
    revisionExpiry: new Date('2026-03-20'),
    bolloAmount: 210,
  },
  // Yamaha MT-07
  IL789MN: {
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2019,
    displacement: 689,
    power: 75,
    revisionExpiry: new Date('2025-12-10'),
    bolloAmount: 138,
  },
  // Honda CB650R
  OP012QR: {
    brand: 'Honda',
    model: 'CB650R',
    year: 2021,
    displacement: 649,
    power: 95,
    revisionExpiry: new Date('2027-01-05'),
    bolloAmount: 162,
  },
  // Kawasaki Z900
  ST345UV: {
    brand: 'Kawasaki',
    model: 'Z900',
    year: 2022,
    displacement: 948,
    power: 125,
    revisionExpiry: new Date('2028-06-12'),
    bolloAmount: 195,
  },
};

/**
 * Normalize plate number
 * Converts to uppercase and removes spaces/special characters
 */
export const normalizePlateNumber = (plate: string): string => {
  return plate.toUpperCase().replace(/[\s-]/g, '');
};

/**
 * Validate Italian plate format
 * Format: AB123CD or AB 123 CD
 */
export const validatePlateFormat = (plate: string): boolean => {
  const normalized = normalizePlateNumber(plate);
  // Italian format: 2 letters + 3 numbers + 2 letters
  const italianFormat = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
  return italianFormat.test(normalized);
};

/**
 * Calculate revision expiry date
 * - First revision: 4 years after registration
 * - Subsequent revisions: every 2 years
 */
export const calculateRevisionDate = (
  registrationYear: number,
  lastRevisionDate?: Date
): Date => {
  if (lastRevisionDate) {
    // Subsequent revision: +2 years from last
    const nextRevision = new Date(lastRevisionDate);
    nextRevision.setFullYear(nextRevision.getFullYear() + 2);
    return nextRevision;
  } else {
    // First revision: +4 years from registration
    const firstRevision = new Date(registrationYear, 0, 1);
    firstRevision.setFullYear(firstRevision.getFullYear() + 4);
    return firstRevision;
  }
};

/**
 * Calculate bollo (road tax) amount
 * Based on power (HP/CV)
 * - Up to 11 CV: €1.50/CV
 * - Above 11 CV: €3.00/CV for exceeding power
 */
export const calculateBollo = (power: number): number => {
  if (power <= 11) {
    return Math.round(power * 1.5);
  }
  return Math.round(11 * 1.5 + (power - 11) * 3.0);
};

/**
 * Fetch vehicle data from mock database
 */
const fetchVehicleDataMock = async (plate: string): Promise<VehicleData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const normalized = normalizePlateNumber(plate);

  // Check if vehicle exists in mock database
  const vehicleData = MOCK_VEHICLES[normalized];

  if (!vehicleData) {
    throw new Error(VehicleAPIError.PLATE_NOT_FOUND);
  }

  return {
    plateNumber: normalized,
    ...vehicleData,
  };
};

/**
 * Fetch vehicle data from OpenAPI.it (real API)
 * TODO: Implement when API key is available
 */
const fetchVehicleDataReal = async (plate: string): Promise<VehicleData> => {
  if (!OPENAPI_KEY) {
    throw new Error(
      'OpenAPI key not configured. Please add EXPO_PUBLIC_OPENAPI_KEY to .env'
    );
  }

  const normalized = normalizePlateNumber(plate);

  try {
    const response = await fetch(`${OPENAPI_BASE_URL}/verifica-targa/${normalized}`, {
      method: 'GET',
      headers: {
        'X-API-Key': OPENAPI_KEY,
        'Content-Type': 'application/json',
      },
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(VehicleAPIError.PLATE_NOT_FOUND);
      }
      if (response.status === 429) {
        throw new Error(VehicleAPIError.RATE_LIMIT);
      }
      throw new Error(VehicleAPIError.API_ERROR);
    }

    const data = await response.json();

    // Map OpenAPI.it response to our VehicleData interface
    // TODO: Adjust field names based on actual API response
    const vehicleData: VehicleData = {
      plateNumber: normalized,
      brand: data.marca || data.brand,
      model: data.modello || data.model,
      year: data.annoImmatricolazione || data.registrationYear,
      displacement: data.cilindrata || data.displacement,
      power: data.potenza || data.power,
      revisionExpiry: data.scadenzaRevisione
        ? new Date(data.scadenzaRevisione)
        : calculateRevisionDate(data.annoImmatricolazione || data.registrationYear),
      bolloAmount: calculateBollo(data.potenza || data.power),
    };

    return vehicleData;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(VehicleAPIError.TIMEOUT);
    }
    if (error.message.includes(VehicleAPIError.PLATE_NOT_FOUND)) {
      throw error;
    }
    if (error.message.includes(VehicleAPIError.RATE_LIMIT)) {
      throw error;
    }
    throw new Error(VehicleAPIError.NETWORK_ERROR);
  }
};

/**
 * Fetch vehicle data from license plate
 * Uses mock or real API based on configuration
 */
export const fetchVehicleData = async (plate: string): Promise<VehicleData> => {
  // Validate plate format
  if (!validatePlateFormat(plate)) {
    throw new Error(VehicleAPIError.INVALID_PLATE);
  }

  // Use mock or real API based on configuration
  if (API_MODE === 'MOCK') {
    return fetchVehicleDataMock(plate);
  } else {
    return fetchVehicleDataReal(plate);
  }
};

/**
 * Get user-friendly error message from API error
 */
export const getVehicleAPIErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case VehicleAPIError.PLATE_NOT_FOUND:
      return 'Targa non trovata. Verifica di averla inserita correttamente.';
    case VehicleAPIError.INVALID_PLATE:
      return 'Formato targa non valido. Usa il formato italiano (es. AB123CD).';
    case VehicleAPIError.API_ERROR:
      return 'Errore nel recupero dei dati. Riprova più tardi.';
    case VehicleAPIError.NETWORK_ERROR:
      return 'Errore di connessione. Verifica la tua connessione internet.';
    case VehicleAPIError.TIMEOUT:
      return 'Richiesta scaduta. Riprova.';
    case VehicleAPIError.RATE_LIMIT:
      return 'Troppe richieste. Attendi qualche minuto e riprova.';
    default:
      return 'Errore sconosciuto. Riprova più tardi.';
  }
};
