/**
 * MotoContext
 * Global motorcycle state management using React Context
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { Moto, MotoCreationData, MotoUpdateData } from '@types';
import { useAuth } from './AuthContext';
import {
  addMoto as firestoreAddMoto,
  getUserMotos as firestoreGetUserMotos,
  updateMoto as firestoreUpdateMoto,
  deleteMoto as firestoreDeleteMoto,
  isPlateNumberTaken as firestoreIsPlateNumberTaken,
} from '@services/firebase';
import { setPrimaryMoto as firestoreSetPrimaryMoto } from '@services/firebase/firestoreUtils';

/**
 * MotoContext Type
 */
export interface MotoContextType {
  // State
  motos: Moto[];
  selectedMoto: Moto | null;
  primaryMoto: Moto | null;
  loading: boolean;
  error: string | null;

  // Actions
  addMoto: (motoData: MotoCreationData) => Promise<Moto>;
  updateMoto: (motoId: string, updates: MotoUpdateData) => Promise<void>;
  deleteMoto: (motoId: string) => Promise<void>;
  selectMoto: (motoId: string) => void;
  setPrimaryMoto: (motoId: string) => Promise<void>;
  refreshMotos: () => Promise<void>;
  isPlateNumberTaken: (plateNumber: string) => Promise<boolean>;
  clearError: () => void;
}

// Create MotoContext
const MotoContext = createContext<MotoContextType | undefined>(undefined);

/**
 * MotoProvider Component
 * Wraps the app section that needs moto state
 */
interface MotoProviderProps {
  children: ReactNode;
}

export const MotoProvider: React.FC<MotoProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const [motos, setMotos] = useState<Moto[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load user motos when user changes
   */
  useEffect(() => {
    if (user) {
      refreshMotos();
    } else {
      // Clear motos when user logs out
      setMotos([]);
      setSelectedMoto(null);
    }
  }, [user]);

  /**
   * Refresh motos from Firestore
   */
  const refreshMotos = async (): Promise<void> => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const userMotos = await firestoreGetUserMotos(user.uid);
      setMotos(userMotos);

      // If there's only one moto, select it automatically
      if (userMotos.length === 1) {
        setSelectedMoto(userMotos[0]);
      }
      // If selected moto was deleted, clear selection
      else if (
        selectedMoto &&
        !userMotos.find((m) => m.id === selectedMoto.id)
      ) {
        setSelectedMoto(null);
      }
    } catch (error: any) {
      console.error('Refresh motos error:', error);
      setError('Errore nel caricamento delle moto');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new moto
   */
  const addMoto = async (motoData: MotoCreationData): Promise<Moto> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);

      const newMoto = await firestoreAddMoto(user.uid, motoData);

      // Update local state
      setMotos((prev) => [newMoto, ...prev]);

      // Select the new moto if it's the only one
      if (motos.length === 0) {
        setSelectedMoto(newMoto);
      }

      return newMoto;
    } catch (error: any) {
      console.error('Add moto error:', error);
      setError('Errore nell\'aggiunta della moto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing moto
   */
  const updateMoto = async (
    motoId: string,
    updates: MotoUpdateData
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await firestoreUpdateMoto(motoId, updates);

      // Update local state
      setMotos((prev) =>
        prev.map((moto) =>
          moto.id === motoId ? { ...moto, ...updates } : moto
        )
      );

      // Update selected moto if it's the one being updated
      if (selectedMoto && selectedMoto.id === motoId) {
        setSelectedMoto({ ...selectedMoto, ...updates });
      }
    } catch (error: any) {
      console.error('Update moto error:', error);
      setError('Errore nell\'aggiornamento della moto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a moto
   */
  const deleteMoto = async (motoId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await firestoreDeleteMoto(motoId);

      // Update local state
      setMotos((prev) => prev.filter((moto) => moto.id !== motoId));

      // Clear selection if the deleted moto was selected
      if (selectedMoto && selectedMoto.id === motoId) {
        setSelectedMoto(null);
      }
    } catch (error: any) {
      console.error('Delete moto error:', error);
      setError('Errore nell\'eliminazione della moto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Select a moto
   */
  const selectMoto = (motoId: string): void => {
    const moto = motos.find((m) => m.id === motoId);
    if (moto) {
      setSelectedMoto(moto);
    }
  };

  /**
   * Set a moto as primary
   */
  const setPrimaryMoto = async (motoId: string): Promise<void> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);

      await firestoreSetPrimaryMoto(user.uid, motoId);

      // Refresh motos to get updated isPrimary values
      await refreshMotos();
    } catch (error: any) {
      console.error('Set primary moto error:', error);
      setError('Errore nell\'impostazione della moto principale');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if plate number is already taken
   */
  const isPlateNumberTaken = async (plateNumber: string): Promise<boolean> => {
    if (!user) return false;

    try {
      return await firestoreIsPlateNumberTaken(user.uid, plateNumber);
    } catch (error: any) {
      console.error('Check plate number error:', error);
      return false;
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  // Computed: Get primary moto
  const primaryMoto = motos.find((m) => m.isPrimary) || null;

  // Context value
  const value: MotoContextType = {
    motos,
    selectedMoto,
    primaryMoto,
    loading,
    error,
    addMoto,
    updateMoto,
    deleteMoto,
    selectMoto,
    setPrimaryMoto,
    refreshMotos,
    isPlateNumberTaken,
    clearError,
  };

  return <MotoContext.Provider value={value}>{children}</MotoContext.Provider>;
};

/**
 * useMoto Hook
 * Custom hook to access MotoContext
 */
export const useMoto = (): MotoContextType => {
  const context = useContext(MotoContext);

  if (context === undefined) {
    throw new Error('useMoto must be used within a MotoProvider');
  }

  return context;
};
