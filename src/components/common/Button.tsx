/**
 * Button Component
 * Reusable styled button with variants, loading state, and icons
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  containerStyle,
}) => {
  const isDisabled = disabled || loading;

  // Get button styles based on variant
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];

    if (isDisabled) {
      return [...baseStyle, styles.buttonDisabled];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.buttonPrimary];
      case 'secondary':
        return [...baseStyle, styles.buttonSecondary];
      case 'outline':
        return [...baseStyle, styles.buttonOutline];
      case 'text':
        return [...baseStyle, styles.buttonText];
      default:
        return [...baseStyle, styles.buttonPrimary];
    }
  };

  // Get text styles based on variant
  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${size}`]];

    if (isDisabled) {
      return [...baseStyle, styles.textDisabled];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.textPrimary];
      case 'secondary':
        return [...baseStyle, styles.textSecondary];
      case 'outline':
        return [...baseStyle, styles.textOutline];
      case 'text':
        return [...baseStyle, styles.textText];
      default:
        return [...baseStyle, styles.textPrimary];
    }
  };

  // Get icon color based on variant
  const getIconColor = () => {
    if (isDisabled) return Colors.buttonDisabledText;

    switch (variant) {
      case 'primary':
        return Colors.buttonPrimaryText;
      case 'secondary':
        return Colors.buttonSecondaryText;
      case 'outline':
        return Colors.primary;
      case 'text':
        return Colors.primary;
      default:
        return Colors.buttonPrimaryText;
    }
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), containerStyle]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Left Icon */}
        {leftIcon && !loading && (
          <Ionicons
            name={leftIcon}
            size={iconSize}
            color={getIconColor()}
            style={styles.leftIcon}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <ActivityIndicator
            size="small"
            color={getIconColor()}
            style={styles.leftIcon}
          />
        )}

        {/* Button Text */}
        <Text style={getTextStyle()}>{title}</Text>

        {/* Right Icon */}
        {rightIcon && !loading && (
          <Ionicons
            name={rightIcon}
            size={iconSize}
            color={getIconColor()}
            style={styles.rightIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Size variants
  button_small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    height: 36,
  },
  button_medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    height: 48,
  },
  button_large: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing['2xl'],
    height: 56,
  },

  // Color variants
  buttonPrimary: {
    backgroundColor: Colors.buttonPrimaryBackground,
  },
  buttonSecondary: {
    backgroundColor: Colors.buttonSecondaryBackground,
  },
  buttonOutline: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonText: {
    backgroundColor: Colors.transparent,
  },
  buttonDisabled: {
    backgroundColor: Colors.buttonDisabledBackground,
    borderColor: Colors.buttonDisabledBackground,
  },

  // Content
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text styles
  text: {
    fontWeight: Typography.fontWeight.semibold,
  },
  text_small: {
    fontSize: Typography.fontSize.sm,
  },
  text_medium: {
    fontSize: Typography.fontSize.base,
  },
  text_large: {
    fontSize: Typography.fontSize.lg,
  },

  // Text color variants
  textPrimary: {
    color: Colors.buttonPrimaryText,
  },
  textSecondary: {
    color: Colors.buttonSecondaryText,
  },
  textOutline: {
    color: Colors.primary,
  },
  textText: {
    color: Colors.primary,
  },
  textDisabled: {
    color: Colors.buttonDisabledText,
  },

  // Icons
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
});
