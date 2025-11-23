/**
 * LoadingSpinner Component
 * Full-screen loading overlay with spinner and optional message
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Colors, Typography, Spacing } from '@constants';

interface LoadingSpinnerProps {
  visible: boolean;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible,
  message,
  fullScreen = false,
}) => {
  if (!visible) return null;

  const content = (
    <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
      <View style={styles.spinnerBox}>
        <ActivityIndicator size="large" color={Colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );

  if (fullScreen) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        {content}
      </Modal>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerBox: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 120,
  },
  message: {
    marginTop: Spacing.base,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
