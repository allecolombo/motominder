/**
 * Input Component
 * Reusable styled text input with label, error state, and icons
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@constants';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: object;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Container - Touchable */}
      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            error && styles.inputContainerError,
          ]}
        >
          {/* Left Icon */}
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={error ? Colors.error : isFocused ? Colors.primary : Colors.textSecondary}
              style={styles.leftIcon}
            />
          )}

          {/* Text Input */}
          <TextInput
            ref={inputRef}
            style={[styles.input, leftIcon && styles.inputWithLeftIcon]}
            placeholderTextColor={Colors.inputPlaceholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...textInputProps}
          />

          {/* Right Icon (e.g., show/hide password) */}
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIconContainer}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={rightIcon}
                size={20}
                color={error ? Colors.error : isFocused ? Colors.primary : Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={Colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.md,
    height: 52,
  },
  inputContainerFocused: {
    borderColor: Colors.inputBorderFocused,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.inputText,
    paddingVertical: 0, // Remove default padding for better alignment
  },
  inputWithLeftIcon: {
    marginLeft: 0,
  },
  rightIconContainer: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.error,
    marginLeft: Spacing.xs,
  },
});
