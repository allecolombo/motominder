/**
 * ErrorMessage Component
 * Displays error messages with icon and optional dismiss button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@constants';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  containerStyle?: object;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  containerStyle,
}) => {
  if (!message) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Error Icon */}
      <Ionicons
        name="alert-circle"
        size={20}
        color={Colors.error}
        style={styles.icon}
      />

      {/* Error Message */}
      <Text style={styles.message}>{message}</Text>

      {/* Dismiss Button */}
      {onDismiss && (
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.dismissButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color={Colors.error} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error + '20', // 20% opacity
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
  dismissButton: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
});
