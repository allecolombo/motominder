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
      style={[styles.container, isSelected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Photo or placeholder */}
      <View style={styles.imageContainer}>
        {moto.photoURL ? (
          <Image source={{ uri: moto.photoURL }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="bicycle" size={40} color={Colors.textTertiary} />
          </View>
        )}
      </View>

      {/* Moto Info */}
      <View style={styles.infoContainer}>
        {/* Nickname or Brand Model */}
        <Text style={styles.title} numberOfLines={1}>
          {moto.nickname || `${moto.brand} ${moto.model}`}
        </Text>

        {/* Subtitle: Brand Model or Plate */}
        <Text style={styles.subtitle} numberOfLines={1}>
          {moto.nickname ? `${moto.brand} ${moto.model}` : moto.plateNumber}
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Year */}
          <View style={styles.statItem}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.statText}>{moto.year}</Text>
          </View>

          {/* Displacement */}
          <View style={styles.statItem}>
            <Ionicons
              name="flash-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.statText}>{moto.displacement} cc</Text>
          </View>

          {/* Power */}
          <View style={styles.statItem}>
            <Ionicons
              name="speedometer-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.statText}>{moto.power} CV</Text>
          </View>
        </View>

        {/* Current KM */}
        <View style={styles.kmRow}>
          <Ionicons
            name="navigate-outline"
            size={14}
            color={Colors.textTertiary}
          />
          <Text style={styles.kmText}>
            {moto.currentKm.toLocaleString('it-IT')} km
          </Text>
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
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.base,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  kmRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kmText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    marginLeft: Spacing.xs,
  },
  selectedIndicator: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
});
