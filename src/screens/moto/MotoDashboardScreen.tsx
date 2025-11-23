/**
 * MotoDashboardScreen
 * Futuristic dashboard for primary motorcycle
 * Inspired by modern UI with colored borders and clean layout
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { LoadingSpinner, BackButton } from '@components/common';
import { useMoto } from '@store';
import { Colors, Typography, Spacing, ScreenPadding, IconSize, BorderRadius } from '@constants';
import { MainStackParamList } from '@navigation/types';

type MotoDashboardScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MotoDashboard'
>;

export const MotoDashboardScreen: React.FC = () => {
  const navigation = useNavigation<MotoDashboardScreenNavigationProp>();
  const { primaryMoto, loading, refreshMotos } = useMoto();

  useEffect(() => {
    refreshMotos();
  }, []);

  const handleViewAllMotos = () => {
    navigation.navigate('MotoList');
  };

  if (loading && !primaryMoto) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner visible={true} message="Caricamento..." />
      </View>
    );
  }

  if (!primaryMoto) {
    // Should not happen - HomeScreen handles navigation logic
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner visible={true} message="Caricamento..." />
      </View>
    );
  }

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Moto Name - BIG and PROMINENT */}
            <Text style={styles.motoName}>
              {primaryMoto.nickname || `${primaryMoto.brand} ${primaryMoto.model}`}
            </Text>

            {/* Subtitle with brand/model/year */}
            <View style={styles.motoInfo}>
              <View style={styles.plateContainer}>
                <Ionicons name="card" size={16} color={Colors.primary} />
                <Text style={styles.plateNumber}>{primaryMoto.plateNumber}</Text>
              </View>
              {primaryMoto.nickname && (
                <Text style={styles.motoSubtitle}>
                  {primaryMoto.brand} {primaryMoto.model} • {primaryMoto.year}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity onPress={handleViewAllMotos} style={styles.menuButton}>
            <Ionicons name="grid" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{primaryMoto.power}</Text>
            <Text style={styles.statLabel}>CV</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{primaryMoto.displacement}</Text>
            <Text style={styles.statLabel}>CC</Text>
          </View>

          <View style={[styles.statCard, styles.kmCard]}>
            <Ionicons name="speedometer" size={20} color={Colors.primary} />
            <Text style={styles.kmValue}>{(primaryMoto.currentKm / 1000).toFixed(1)}k</Text>
            <Text style={styles.kmLabel}>km</Text>
          </View>
        </View>

        {/* Prossime Scadenze */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prossime scadenze</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>Vedi tutte</Text>
            </TouchableOpacity>
          </View>

          {/* Deadlines */}
          {primaryMoto.deadlines?.revisione && (
            <View
              style={[
                styles.deadlineCard,
                {
                  borderLeftColor: getUrgencyColor(
                    getDaysUntil(primaryMoto.deadlines.revisione.expiryDate)
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
                  {new Date(primaryMoto.deadlines.revisione.expiryDate).toLocaleDateString('it-IT')}
                </Text>
              </View>
              <View
                style={[
                  styles.deadlineBadge,
                  {
                    backgroundColor:
                      getUrgencyColor(getDaysUntil(primaryMoto.deadlines.revisione.expiryDate)) + '20',
                    borderColor: getUrgencyColor(
                      getDaysUntil(primaryMoto.deadlines.revisione.expiryDate)
                    ),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.deadlineBadgeText,
                    {
                      color: getUrgencyColor(
                        getDaysUntil(primaryMoto.deadlines.revisione.expiryDate)
                      ),
                    },
                  ]}
                >
                  {getDaysUntil(primaryMoto.deadlines.revisione.expiryDate)} giorni
                </Text>
              </View>
            </View>
          )}

          {primaryMoto.deadlines?.tagliando && (
            <View style={[styles.deadlineCard, { borderLeftColor: Colors.warning }]}>
              <View style={styles.deadlineIcon}>
                <Ionicons name="construct" size={24} color={Colors.textSecondary} />
              </View>
              <View style={styles.deadlineInfo}>
                <Text style={styles.deadlineTitle}>Tagliando</Text>
                <Text style={styles.deadlineDate}>
                  {primaryMoto.deadlines.tagliando.nextKm.toLocaleString('it-IT')} km
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
                  {(primaryMoto.deadlines.tagliando.nextKm - primaryMoto.currentKm).toLocaleString()} km
                </Text>
              </View>
            </View>
          )}

          {primaryMoto.deadlines?.assicurazione && (
            <View
              style={[
                styles.deadlineCard,
                {
                  borderLeftColor: getUrgencyColor(
                    getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate)
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
                  {new Date(primaryMoto.deadlines.assicurazione.expiryDate).toLocaleDateString(
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
                        getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate)
                      ) + '20',
                    borderColor: getUrgencyColor(
                      getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate)
                    ),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.deadlineBadgeText,
                    {
                      color: getUrgencyColor(
                        getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate)
                      ),
                    },
                  ]}
                >
                  {getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate) > 30
                    ? `${Math.floor(getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate) / 30)} mesi`
                    : `${getDaysUntil(primaryMoto.deadlines.assicurazione.expiryDate)} giorni`}
                </Text>
              </View>
            </View>
          )}

          {/* No deadlines placeholder */}
          {!primaryMoto.deadlines?.revisione &&
           !primaryMoto.deadlines?.assicurazione &&
           !primaryMoto.deadlines?.tagliando && (
            <View style={styles.placeholderCard}>
              <Ionicons name="calendar-outline" size={32} color={Colors.textTertiary} />
              <Text style={styles.placeholderText}>
                Nessuna scadenza registrata
              </Text>
              <Text style={styles.placeholderSubtext}>
                Le scadenze verranno aggiunte nei prossimi aggiornamenti
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions - Coming Soon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Azioni rapide</Text>
          <View style={styles.actionsGrid}>
            <View style={styles.actionCardDisabled}>
              <Ionicons name="add-circle" size={32} color={Colors.textTertiary} />
              <Text style={styles.actionTextDisabled}>Aggiungi scadenza</Text>
              <Text style={styles.comingSoonText}>Prossimamente</Text>
            </View>

            <View style={styles.actionCardDisabled}>
              <Ionicons name="car" size={32} color={Colors.textTertiary} />
              <Text style={styles.actionTextDisabled}>Aggiorna KM</Text>
              <Text style={styles.comingSoonText}>Prossimamente</Text>
            </View>

            <View style={styles.actionCardDisabled}>
              <Ionicons name="document-text" size={32} color={Colors.textTertiary} />
              <Text style={styles.actionTextDisabled}>Storico</Text>
              <Text style={styles.comingSoonText}>Prossimamente</Text>
            </View>

            <View style={styles.actionCardDisabled}>
              <Ionicons name="settings" size={32} color={Colors.textTertiary} />
              <Text style={styles.actionTextDisabled}>Impostazioni</Text>
              <Text style={styles.comingSoonText}>Prossimamente</Text>
            </View>
          </View>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: ScreenPadding.horizontal,
    paddingVertical: ScreenPadding.vertical,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing['2xl'],
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flex: 1,
  },
  motoName: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: Typography.fontSize['4xl'] * 1.2,
  },
  motoInfo: {
    gap: Spacing.xs,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  plateNumber: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  motoSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  kmCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  kmValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  kmLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  viewAllLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
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
  placeholderCard: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  placeholderSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCardDisabled: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
    opacity: 0.6,
  },
  actionTextDisabled: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginTop: Spacing.xs / 2,
    fontStyle: 'italic',
  },
});
