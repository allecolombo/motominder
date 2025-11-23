/**
 * MotoDetailScreen
 * Displays detailed motorcycle information with edit/delete actions
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@components/common';
import { useMoto } from '@store';
import { Colors, Typography, Spacing, ScreenPadding, IconSize, BorderRadius } from '@constants';
import { MainStackParamList } from '@navigation/types';

type MotoDetailScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MotoDetail'
>;

type MotoDetailScreenRouteProp = RouteProp<MainStackParamList, 'MotoDetail'>;

export const MotoDetailScreen: React.FC = () => {
  const navigation = useNavigation<MotoDetailScreenNavigationProp>();
  const route = useRoute<MotoDetailScreenRouteProp>();
  const { motoId } = route.params;

  const { motos, deleteMoto } = useMoto();

  // Find moto by ID
  const moto = motos.find((m) => m.id === motoId);

  if (!moto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Moto non trovata</Text>
        <Button
          title="Torna Indietro"
          onPress={() => navigation.goBack()}
          variant="outline"
        />
      </View>
    );
  }

  /**
   * Handle delete moto
   */
  const handleDelete = () => {
    Alert.alert(
      'Elimina Moto',
      `Sei sicuro di voler eliminare ${moto.nickname || moto.brand + ' ' + moto.model}?`,
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMoto(moto.id);
              Alert.alert('Moto eliminata', 'La moto è stata eliminata con successo', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (error) {
              Alert.alert('Errore', 'Impossibile eliminare la moto. Riprova.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.iconPlaceholder}>
          <Ionicons name="bicycle" size={IconSize['2xl']} color={Colors.primary} />
        </View>

        <Text style={styles.title}>
          {moto.nickname || `${moto.brand} ${moto.model}`}
        </Text>

        {moto.nickname && (
          <Text style={styles.subtitle}>
            {moto.brand} {moto.model}
          </Text>
        )}

        <Text style={styles.plateNumber}>{moto.plateNumber}</Text>
      </View>

      {/* Specs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specifiche</Text>

        <View style={styles.specRow}>
          <View style={styles.specItem}>
            <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Anno</Text>
            <Text style={styles.specValue}>{moto.year}</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="flash-outline" size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Cilindrata</Text>
            <Text style={styles.specValue}>{moto.displacement} cc</Text>
          </View>

          <View style={styles.specItem}>
            <Ionicons name="speedometer-outline" size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Potenza</Text>
            <Text style={styles.specValue}>{moto.power} CV</Text>
          </View>
        </View>

        <View style={styles.kmCard}>
          <Ionicons name="navigate-outline" size={32} color={Colors.primary} />
          <View style={styles.kmInfo}>
            <Text style={styles.kmLabel}>Chilometraggio</Text>
            <Text style={styles.kmValue}>
              {moto.currentKm.toLocaleString('it-IT')} km
            </Text>
          </View>
        </View>
      </View>

      {/* Deadlines Section (Placeholder) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scadenze</Text>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>
            Le scadenze verranno implementate nel Milestone 3
          </Text>
        </View>
      </View>

      {/* Notes Section */}
      {moto.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note</Text>
          <Text style={styles.notesText}>{moto.notes}</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsSection}>
        {/* TODO: Implement edit functionality in future
        <Button
          title="Modifica"
          onPress={() => {}}
          variant="outline"
          leftIcon="create-outline"
          containerStyle={styles.actionButton}
        />
        */}

        <Button
          title="Elimina Moto"
          onPress={handleDelete}
          variant="outline"
          leftIcon="trash-outline"
          containerStyle={styles.deleteButton}
        />
      </View>

      {/* Info Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Aggiunta il {moto.addedAt.toDate().toLocaleDateString('it-IT')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: ScreenPadding.horizontal,
    paddingVertical: ScreenPadding.vertical,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ScreenPadding.horizontal,
  },
  errorText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.error,
    marginBottom: Spacing.xl,
  },
  headerCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  plateNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.base,
    marginTop: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: 12,
    marginHorizontal: Spacing.xs,
  },
  specLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  specValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  kmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  kmInfo: {
    marginLeft: Spacing.base,
  },
  kmLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  kmValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  placeholderBox: {
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  placeholderText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  notesText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: 12,
  },
  actionsSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
  deleteButton: {
    borderColor: Colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
  },
});
