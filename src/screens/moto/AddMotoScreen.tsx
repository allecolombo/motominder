/**
 * AddMotoScreen
 * Add new motorcycle by license plate with auto-fetch data
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Input, Button, ErrorMessage, LoadingSpinner, BackButton } from '@components/common';
import { useMoto, useAlert } from '@store';
import {
  fetchVehicleData,
  normalizePlateNumber,
  getVehicleAPIErrorMessage,
} from '@services/api';
import { VehicleData, MotoCreationData } from '@types';
import { Colors, Typography, Spacing, ScreenPadding } from '@constants';
import { MainStackParamList } from '@navigation/types';

type AddMotoScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'AddMoto'
>;

export const AddMotoScreen: React.FC = () => {
  const navigation = useNavigation<AddMotoScreenNavigationProp>();
  const { addMoto, isPlateNumberTaken } = useMoto();
  const { showSuccess, showError } = useAlert();

  // Form state
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [currentKm, setCurrentKm] = useState('');
  const [nickname, setNickname] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    plateNumber?: string;
    currentKm?: string;
  }>({});

  /**
   * Fetch vehicle data from API
   */
  const handleFetchVehicleData = async () => {
    // Clear previous errors
    setError(null);
    setValidationErrors({});

    // Validate plate number
    if (!plateNumber.trim()) {
      setValidationErrors({ plateNumber: 'Inserisci la targa' });
      return;
    }

    try {
      setLoading(true);

      // Check if plate is already registered
      const isTaken = await isPlateNumberTaken(plateNumber);
      if (isTaken) {
        setValidationErrors({
          plateNumber: 'Questa targa è già registrata',
        });
        return;
      }

      // Fetch vehicle data
      const data = await fetchVehicleData(plateNumber);
      setVehicleData(data);

      // Show success message
      showSuccess('Dati recuperati', `${data.brand} ${data.model} (${data.year})`);
    } catch (error: any) {
      const errorMessage = getVehicleAPIErrorMessage(error.message);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save moto to database
   */
  const handleSaveMoto = async () => {
    // Clear previous errors
    setError(null);
    setValidationErrors({});

    // Validate
    const errors: { plateNumber?: string; currentKm?: string } = {};

    if (!vehicleData) {
      errors.plateNumber = 'Recupera prima i dati della moto';
    }

    if (!currentKm.trim()) {
      errors.currentKm = 'Inserisci i km attuali';
    } else if (isNaN(Number(currentKm)) || Number(currentKm) < 0) {
      errors.currentKm = 'Inserisci un valore valido';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setLoading(true);

      const motoData: MotoCreationData = {
        plateNumber: normalizePlateNumber(vehicleData!.plateNumber),
        brand: vehicleData!.brand,
        model: vehicleData!.model,
        year: vehicleData!.year,
        displacement: vehicleData!.displacement,
        power: vehicleData!.power,
        currentKm: Number(currentKm),
        nickname: nickname.trim() || undefined,
        deadlines: {
          revisione: vehicleData!.revisionExpiry
            ? { expiryDate: vehicleData!.revisionExpiry }
            : undefined,
          bollo: vehicleData!.bolloAmount
            ? {
                expiryDate: new Date(new Date().getFullYear(), 11, 31), // End of year
                amount: vehicleData!.bolloAmount,
                isPaid: false,
              }
            : undefined,
        },
      };

      await addMoto(motoData);

      // Show success and navigate back
      showSuccess(
        'Moto aggiunta',
        `${vehicleData!.brand} ${vehicleData!.model} è stata aggiunta con successo!`,
        () => navigation.goBack()
      );
    } catch (error: any) {
      setError('Errore nel salvataggio della moto. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle plate number change with auto-uppercase
   */
  const handlePlateChange = (text: string) => {
    setPlateNumber(text.toUpperCase());
    // Clear vehicle data when plate changes
    if (vehicleData) {
      setVehicleData(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        {/* Back Button */}
        <BackButton style={styles.backButton} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Aggiungi Moto</Text>
          <Text style={styles.subtitle}>
            Inserisci la targa per recuperare automaticamente i dati
          </Text>
        </View>

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {/* Plate Number Input */}
        <Input
          label="Targa"
          placeholder="AB123CD"
          value={plateNumber}
          onChangeText={handlePlateChange}
          error={validationErrors.plateNumber}
          leftIcon="card-outline"
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={7}
          editable={!vehicleData}
        />

        {/* Fetch Data Button */}
        {!vehicleData && (
          <Button
            title="Recupera Dati"
            onPress={handleFetchVehicleData}
            loading={loading}
            disabled={loading || !plateNumber.trim()}
            leftIcon="search-outline"
            containerStyle={styles.fetchButton}
          />
        )}

        {/* Vehicle Data Display */}
        {vehicleData && (
          <View style={styles.vehicleDataContainer}>
            <Text style={styles.vehicleDataTitle}>Dati Recuperati</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Marca:</Text>
              <Text style={styles.infoValue}>{vehicleData.brand}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Modello:</Text>
              <Text style={styles.infoValue}>{vehicleData.model}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Anno:</Text>
              <Text style={styles.infoValue}>{vehicleData.year}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cilindrata:</Text>
              <Text style={styles.infoValue}>{vehicleData.displacement} cc</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Potenza:</Text>
              <Text style={styles.infoValue}>{vehicleData.power} CV</Text>
            </View>

            {/* Change plate button */}
            <Button
              title="Cambia Targa"
              onPress={() => setVehicleData(null)}
              variant="outline"
              size="small"
              containerStyle={styles.changeButton}
            />
          </View>
        )}

        {/* Additional Fields (only if vehicle data fetched) */}
        {vehicleData && (
          <>
            {/* Current KM */}
            <Input
              label="Chilometri Attuali"
              placeholder="15000"
              value={currentKm}
              onChangeText={setCurrentKm}
              error={validationErrors.currentKm}
              leftIcon="navigate-outline"
              keyboardType="numeric"
            />

            {/* Nickname (Optional) */}
            <Input
              label="Soprannome (Opzionale)"
              placeholder="La Bestia"
              value={nickname}
              onChangeText={setNickname}
              leftIcon="pricetag-outline"
              maxLength={50}
            />

            {/* Save Button */}
            <Button
              title="Salva Moto"
              onPress={handleSaveMoto}
              loading={loading}
              disabled={loading}
              leftIcon="checkmark-circle-outline"
              containerStyle={styles.saveButton}
            />
          </>
        )}
        </ScrollView>

        {/* Loading Overlay */}
        <LoadingSpinner visible={loading} message="Caricamento..." fullScreen />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ScreenPadding.horizontal,
    paddingVertical: ScreenPadding.vertical,
  },
  backButton: {
    marginBottom: Spacing.base,
  },
  header: {
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  fetchButton: {
    marginTop: Spacing.base,
  },
  vehicleDataContainer: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    padding: Spacing.lg,
    marginVertical: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  vehicleDataTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    fontWeight: Typography.fontWeight.semibold,
  },
  changeButton: {
    marginTop: Spacing.base,
  },
  saveButton: {
    marginTop: Spacing.xl,
  },
});
