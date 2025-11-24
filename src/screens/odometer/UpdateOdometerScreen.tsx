/**
 * UpdateOdometerScreen
 * Quick screen to update motorcycle odometer reading
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Input, Button, BackButton } from '@components/common';
import { useMoto, useAuth, useAlert } from '@store';
import { Colors, Typography, Spacing, ScreenPadding, BorderRadius } from '@constants';
import { MainStackParamList } from '@navigation/types';
import { logOdometerReading } from '@services/firebase/firestore';

type UpdateOdometerScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'UpdateOdometer'
>;

type UpdateOdometerScreenRouteProp = RouteProp<
  MainStackParamList,
  'UpdateOdometer'
>;

export const UpdateOdometerScreen: React.FC = () => {
  const navigation = useNavigation<UpdateOdometerScreenNavigationProp>();
  const route = useRoute<UpdateOdometerScreenRouteProp>();
  const { user } = useAuth();
  const { motos, updateMoto } = useMoto();
  const { showSuccess, showError } = useAlert();

  const { motoId } = route.params;
  const moto = motos.find((m) => m.id === motoId);

  const [km, setKm] = useState(moto?.currentKm.toString() || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!moto || !user) {
    navigation.goBack();
    return null;
  }

  const handleSave = async () => {
    // Clear previous error
    setError(null);

    // Parse km
    const newKm = parseInt(km.replace(/[^0-9]/g, ''));

    // Validation
    if (isNaN(newKm) || newKm <= 0) {
      setError('Inserisci un valore valido');
      return;
    }

    if (newKm < moto.currentKm) {
      setError(`I km non possono essere minori di ${moto.currentKm.toLocaleString('it-IT')}`);
      return;
    }

    if (newKm === moto.currentKm) {
      setError('I km sono già aggiornati');
      return;
    }

    setLoading(true);

    try {
      // Update moto km
      await updateMoto(moto.id, { currentKm: newKm });

      // Log odometer reading
      await logOdometerReading(user.uid, moto.id, newKm);

      // Check if tagliando is approaching
      const tagliando = moto.deadlines?.tagliando;
      if (tagliando) {
        const kmToService = tagliando.nextKm - newKm;
        if (kmToService <= 1000 && kmToService > 0) {
          showSuccess(
            'Tagliando in arrivo!',
            `Mancano solo ${kmToService.toLocaleString('it-IT')} km al prossimo tagliando. Ricordati di prenotare!`,
            () => navigation.goBack()
          );
          return;
        } else if (kmToService <= 0) {
          showSuccess(
            'Tagliando scaduto!',
            `Hai superato i km del tagliando. Prenota subito il servizio!`,
            () => navigation.goBack()
          );
          return;
        }
      }

      // Success
      showSuccess(
        'Chilometraggio aggiornato',
        `Km aggiornati a ${newKm.toLocaleString('it-IT')} per ${moto.nickname || moto.model}`,
        () => navigation.goBack()
      );
    } catch (err: any) {
      console.error('Update odometer error:', err);
      showError(
        'Errore',
        'Impossibile aggiornare il chilometraggio. Riprova.',
        () => navigation.goBack()
      );
    } finally {
      setLoading(false);
    }
  };

  const formatKm = (value: string) => {
    // Remove non-numeric characters
    const numbers = value.replace(/[^0-9]/g, '');
    // Format with thousands separator
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleKmChange = (value: string) => {
    setKm(formatKm(value));
    setError(null);
  };

  const kmDiff = parseInt(km.replace(/[^0-9]/g, '')) - moto.currentKm;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Back Button */}
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="speedometer" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Aggiorna Chilometraggio</Text>
            <Text style={styles.subtitle}>
              {moto.nickname || `${moto.brand} ${moto.model}`}
            </Text>
          </View>

          {/* Current KM Display */}
          <View style={styles.currentKmCard}>
            <Text style={styles.currentKmLabel}>Chilometraggio attuale</Text>
            <Text style={styles.currentKmValue}>
              {moto.currentKm.toLocaleString('it-IT')} km
            </Text>
          </View>

          {/* KM Input */}
          <View style={styles.inputSection}>
            <Input
              label="Nuovo chilometraggio"
              placeholder={moto.currentKm.toString()}
              value={km}
              onChangeText={handleKmChange}
              error={error || undefined}
              leftIcon="create-outline"
              keyboardType="number-pad"
              autoFocus
              containerStyle={styles.input}
            />

            {/* KM Difference Indicator */}
            {km && !isNaN(parseInt(km.replace(/[^0-9]/g, ''))) && kmDiff > 0 && (
              <View style={styles.diffCard}>
                <Ionicons name="trending-up" size={20} color={Colors.success} />
                <Text style={styles.diffText}>
                  +{kmDiff.toLocaleString('it-IT')} km dall'ultimo aggiornamento
                </Text>
              </View>
            )}
          </View>

          {/* Save Button */}
          <Button
            title="Salva Chilometraggio"
            onPress={handleSave}
            loading={loading}
            disabled={loading || !km || !!error}
            containerStyle={styles.saveButton}
          />

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              Aggiorna il chilometraggio regolarmente per tenere traccia dei tagliandi e delle
              manutenzioni.
            </Text>
          </View>
        </ScrollView>
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
  backButtonContainer: {
    marginBottom: Spacing.base,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  currentKmCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  currentKmLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  currentKmValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  inputSection: {
    marginBottom: Spacing.xl,
  },
  input: {
    marginBottom: Spacing.md,
  },
  diffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  diffText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.success,
    flex: 1,
  },
  saveButton: {
    marginBottom: Spacing.xl,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: Typography.fontSize.sm * 1.5,
  },
});
