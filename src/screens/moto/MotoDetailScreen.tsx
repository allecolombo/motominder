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
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Button, BackButton } from '@components/common';
import { useMoto, useAlert } from '@store';
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

  const { motos, deleteMoto, setPrimaryMoto } = useMoto();
  const { showConfirm, showSuccess, showError } = useAlert();

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
   * Handle set as primary moto
   */
  const handleSetPrimary = async () => {
    try {
      await setPrimaryMoto(moto.id);
      showSuccess(
        'Moto Principale Impostata',
        `${moto.nickname || moto.brand + ' ' + moto.model} è ora la tua moto principale!`
      );
    } catch (error) {
      showError('Errore', 'Impossibile impostare la moto principale. Riprova.');
    }
  };

  // Calculate days until deadlines
  const getDaysUntil = (date: Date | any): number => {
    const now = new Date();
    // Convert Firestore Timestamp to Date if needed
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    const diff = dateObj.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Get urgency color based on days
  const getUrgencyColor = (days: number): string => {
    if (days < 0) return Colors.error; // Expired
    if (days <= 7) return Colors.error; // Urgent (red)
    if (days <= 30) return Colors.warning; // Warning (yellow)
    return Colors.success; // OK (green)
  };

  /**
   * Handle delete moto
   */
  const handleDelete = () => {
    showConfirm(
      'Elimina Moto',
      `Sei sicuro di voler eliminare ${moto.nickname || moto.brand + ' ' + moto.model}?`,
      async () => {
        // User confirmed deletion
        try {
          await deleteMoto(moto.id);
          showSuccess('Moto eliminata', 'La moto è stata eliminata con successo', () => {
            navigation.goBack();
          });
        } catch (error) {
          showError('Errore', 'Impossibile eliminare la moto. Riprova.');
        }
      },
      undefined, // onCancel - not needed
      'Elimina',
      'Annulla'
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Back Button */}
      <BackButton style={styles.backButton} />

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

      {/* Prossime Scadenze */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prossime Scadenze</Text>

        {/* Revisione */}
        {moto.deadlines?.revisione && (
          <View
            style={[
              styles.deadlineCard,
              {
                borderLeftColor: getUrgencyColor(
                  getDaysUntil(moto.deadlines.revisione.expiryDate)
                ),
              },
            ]}
          >
            <View style={styles.deadlineIcon}>
              <Ionicons name="shield-checkmark" size={24} color={Colors.textSecondary} />
            </View>
            <View style={styles.deadlineInfo}>
              <Text style={styles.deadlineTitle}>Revisione</Text>
              <Text style={styles.deadlineDate}>
                {new Date(moto.deadlines.revisione.expiryDate).toLocaleDateString('it-IT')}
              </Text>
            </View>
            <View
              style={[
                styles.deadlineBadge,
                {
                  backgroundColor:
                    getUrgencyColor(getDaysUntil(moto.deadlines.revisione.expiryDate)) + '20',
                  borderColor: getUrgencyColor(
                    getDaysUntil(moto.deadlines.revisione.expiryDate)
                  ),
                },
              ]}
            >
              <Text
                style={[
                  styles.deadlineBadgeText,
                  {
                    color: getUrgencyColor(
                      getDaysUntil(moto.deadlines.revisione.expiryDate)
                    ),
                  },
                ]}
              >
                {getDaysUntil(moto.deadlines.revisione.expiryDate)} giorni
              </Text>
            </View>
          </View>
        )}

        {/* Tagliando */}
        {moto.deadlines?.tagliando && (
          <View style={[styles.deadlineCard, { borderLeftColor: Colors.warning }]}>
            <View style={styles.deadlineIcon}>
              <Ionicons name="construct" size={24} color={Colors.textSecondary} />
            </View>
            <View style={styles.deadlineInfo}>
              <Text style={styles.deadlineTitle}>Tagliando</Text>
              <Text style={styles.deadlineDate}>
                {moto.deadlines.tagliando.nextKm.toLocaleString('it-IT')} km
              </Text>
            </View>
            <View
              style={[
                styles.deadlineBadge,
                {
                  backgroundColor: Colors.warning + '20',
                  borderColor: Colors.warning,
                },
              ]}
            >
              <Text style={[styles.deadlineBadgeText, { color: Colors.warning }]}>
                {(moto.deadlines.tagliando.nextKm - moto.currentKm).toLocaleString()} km
              </Text>
            </View>
          </View>
        )}

        {/* Assicurazione */}
        {moto.deadlines?.assicurazione && (
          <View
            style={[
              styles.deadlineCard,
              {
                borderLeftColor: getUrgencyColor(
                  getDaysUntil(moto.deadlines.assicurazione.expiryDate)
                ),
              },
            ]}
          >
            <View style={styles.deadlineIcon}>
              <Ionicons name="shield" size={24} color={Colors.textSecondary} />
            </View>
            <View style={styles.deadlineInfo}>
              <Text style={styles.deadlineTitle}>Assicurazione</Text>
              <Text style={styles.deadlineDate}>
                {new Date(moto.deadlines.assicurazione.expiryDate).toLocaleDateString(
                  'it-IT'
                )}
              </Text>
            </View>
            <View
              style={[
                styles.deadlineBadge,
                {
                  backgroundColor:
                    getUrgencyColor(
                      getDaysUntil(moto.deadlines.assicurazione.expiryDate)
                    ) + '20',
                  borderColor: getUrgencyColor(
                    getDaysUntil(moto.deadlines.assicurazione.expiryDate)
                  ),
                },
              ]}
            >
              <Text
                style={[
                  styles.deadlineBadgeText,
                  {
                    color: getUrgencyColor(
                      getDaysUntil(moto.deadlines.assicurazione.expiryDate)
                    ),
                  },
                ]}
              >
                {getDaysUntil(moto.deadlines.assicurazione.expiryDate) > 30
                  ? `${Math.floor(getDaysUntil(moto.deadlines.assicurazione.expiryDate) / 30)} mesi`
                  : `${getDaysUntil(moto.deadlines.assicurazione.expiryDate)} giorni`}
              </Text>
            </View>
          </View>
        )}

        {/* No deadlines placeholder */}
        {!moto.deadlines?.revisione &&
         !moto.deadlines?.assicurazione &&
         !moto.deadlines?.tagliando && (
          <View style={styles.placeholderBox}>
            <Ionicons name="calendar-outline" size={32} color={Colors.textTertiary} />
            <Text style={styles.placeholderText}>
              Nessuna scadenza registrata
            </Text>
          </View>
        )}
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
        {/* Set as Primary Button (only if not already primary) */}
        {!moto.isPrimary && (
          <Button
            title="Imposta come Principale"
            onPress={handleSetPrimary}
            variant="primary"
            leftIcon="star"
            containerStyle={styles.actionButton}
          />
        )}

        {/* Primary Badge (shown if this is the primary moto) */}
        {moto.isPrimary && (
          <View style={styles.primaryBadge}>
            <Ionicons name="star" size={20} color={Colors.primary} />
            <Text style={styles.primaryBadgeText}>Moto Principale</Text>
          </View>
        )}

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
    </SafeAreaView>
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
  backButton: {
    marginBottom: Spacing.base,
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
  deadlineCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
  },
  deadlineIcon: {
    marginRight: Spacing.md,
  },
  deadlineInfo: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  deadlineDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  deadlineBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
  },
  deadlineBadgeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  placeholderBox: {
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
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
  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '20',
    padding: Spacing.md,
    borderRadius: BorderRadius.base,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  primaryBadgeText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
    marginLeft: Spacing.sm,
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
