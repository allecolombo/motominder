/**
 * CustomAlert Component
 * Custom modal alert integrated with app design system
 * Replaces native Alert.alert() with consistent styling
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, BorderRadius } from '@constants';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: 'OK', style: 'default' }],
  onDismiss,
  icon,
  iconColor = Colors.primary,
}) => {
  const handleButtonPress = (button: AlertButton) => {
    // Close alert first
    if (onDismiss) {
      onDismiss();
    }

    // Execute callback after alert close animation (300ms)
    if (button.onPress) {
      setTimeout(() => {
        button.onPress!();
      }, 350);
    }
  };

  const handleBackdropPress = () => {
    // Only dismiss if there's a cancel button or single OK button
    const hasCancelButton = buttons.some((b) => b.style === 'cancel');
    const isSingleButton = buttons.length === 1;

    if (hasCancelButton || isSingleButton) {
      const cancelButton = buttons.find((b) => b.style === 'cancel');
      if (cancelButton) {
        handleButtonPress(cancelButton);
      } else if (onDismiss) {
        onDismiss();
      }
    }
  };

  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButton;
      case 'cancel':
        return styles.cancelButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButtonText;
      case 'cancel':
        return styles.cancelButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleBackdropPress}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.alertContainer}>
              {/* Icon */}
              {icon && (
                <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                  <Ionicons name={icon} size={32} color={iconColor} />
                </View>
              )}

              {/* Title */}
              <Text style={styles.title}>{title}</Text>

              {/* Message */}
              {message && <Text style={styles.message}>{message}</Text>}

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      getButtonStyle(button.style),
                      buttons.length === 1 && styles.singleButton,
                      buttons.length === 2 && index === 0 && styles.leftButton,
                      buttons.length === 2 && index === 1 && styles.rightButton,
                    ]}
                    onPress={() => handleButtonPress(button)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.buttonText, getButtonTextStyle(button.style)]}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  alertContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: Colors.border,
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing.xl,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  singleButton: {
    flex: 1,
  },
  leftButton: {
    flex: 1,
  },
  rightButton: {
    flex: 1,
  },
  defaultButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: Colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  destructiveButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  defaultButtonText: {
    color: Colors.white,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
  },
  destructiveButtonText: {
    color: Colors.white,
  },
});
