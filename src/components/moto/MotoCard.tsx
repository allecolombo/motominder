/**
 * MotoCard Component
 * Displays motorcycle information in a card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Moto } from '@types';
import { Colors, Typography, Spacing, BorderRadius } from '@constants';

interface MotoCardProps {
  moto: Moto;
  onPress: () => void;
  isSelected?: boolean;
}

export const MotoCard: React.FC<MotoCardProps> = ({
  moto,
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        moto.isPrimary && styles.containerPrimary,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header with name and badges */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {moto.nickname || `${moto.brand} ${moto.model}`}
          </Text>
          <Text style={styles.plateNumber}>{moto.plateNumber}</Text>
        </View>

        <View style={styles.headerRight}>
          {/* Primary Badge */}
          {moto.isPrimary && (
            <View style={styles.primaryBadge}>
              <Ionicons name="star" size={12} color={Colors.primary} />
              <Text style={styles.primaryText}>PRINCIPALE</Text>
            </View>
          )}
        </View>
      </View>

      {/* Subtitle */}
      {moto.nickname && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {moto.brand} {moto.model} • {moto.year}
        </Text>
      )}

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {/* Power */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{moto.power}</Text>
          <Text style={styles.statLabel}>CV</Text>
        </View>

        {/* Displacement */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{moto.displacement}</Text>
          <Text style={styles.statLabel}>CC</Text>
        </View>

        {/* KM */}
        <View style={[styles.statBox, styles.kmBox]}>
          <Ionicons name="speedometer" size={16} color={Colors.primary} />
          <Text style={styles.kmValue}>{(moto.currentKm / 1000).toFixed(1)}k</Text>
          <Text style={styles.kmLabel}>km</Text>
        </View>
      </View>

      {/* Selected Indicator */}
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    borderLeftColor: Colors.border,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated,
  },
  containerPrimary: {
    borderLeftColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  plateNumber: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 4,
  },
  primaryText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  kmBox: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs / 2,
  },
  kmValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  kmLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
});
