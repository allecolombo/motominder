/**
 * HomeScreen (Placeholder)
 * Main dashboard - will be implemented in Milestone 3
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '@components/common';
import { useAuth } from '@store';
import { Colors, Typography, Spacing, ScreenPadding } from '@constants';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MotoMinder</Text>
        <Text style={styles.subtitle}>Benvenuto, {user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Placeholder Content */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Autenticazione completata con successo
        </Text>
        <Text style={styles.placeholderSubtext}>
          La dashboard con le scadenze sarà implementata nel prossimo
          milestone.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Prossimi passi:</Text>
          <Text style={styles.infoText}>• Milestone 2: Aggiungi Moto</Text>
          <Text style={styles.infoText}>• Milestone 3: Dashboard Scadenze</Text>
          <Text style={styles.infoText}>• Milestone 4: Odometro</Text>
          <Text style={styles.infoText}>• Milestone 5+: Features avanzate</Text>
        </View>
      </View>

      {/* Logout Button */}
      <Button
        title="Esci"
        onPress={handleLogout}
        variant="outline"
        leftIcon="log-out-outline"
        containerStyle={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: ScreenPadding.horizontal,
    paddingVertical: ScreenPadding.vertical,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  placeholderSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing['2xl'],
  },
  infoBox: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    width: '100%',
    marginTop: Spacing.xl,
  },
  infoTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  logoutButton: {
    marginTop: Spacing.xl,
  },
});
