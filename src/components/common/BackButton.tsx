/**
 * BackButton Component
 * Elegant back button for navigation
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing } from '@constants';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: any;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color = Colors.text,
  size = 24,
  style,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
