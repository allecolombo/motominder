/**
 * MotoMinder Color Palette
 * Racing-inspired dark theme with orange accents
 */

export const Colors = {
  // Primary Colors (Racing Orange)
  primary: '#FF6B00',
  primaryDark: '#E55D00',
  primaryLight: '#FF8533',

  // Background Colors (Dark Theme)
  background: '#0A0A0A',
  backgroundSecondary: '#1A1A1A',
  backgroundTertiary: '#2A2A2A',

  // Surface Colors
  surface: '#1E1E1E',
  surfaceElevated: '#2D2D2D',
  surfaceHighlight: '#3A3A3A',

  // Text Colors
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  textDisabled: '#4A4A4A',

  // State Colors
  success: '#00C853',
  successLight: '#69F0AE',
  error: '#FF3B30',
  errorLight: '#FF6B66',
  warning: '#FFB300',
  warningLight: '#FFD54F',
  info: '#2196F3',
  infoLight: '#64B5F6',

  // Border Colors
  border: '#333333',
  borderLight: '#404040',
  borderDark: '#1A1A1A',

  // Input Colors
  inputBackground: '#1E1E1E',
  inputBorder: '#333333',
  inputBorderFocused: '#FF6B00',
  inputText: '#FFFFFF',
  inputPlaceholder: '#808080',

  // Button Colors
  buttonPrimaryBackground: '#FF6B00',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondaryBackground: '#2A2A2A',
  buttonSecondaryText: '#FFFFFF',
  buttonDisabledBackground: '#1A1A1A',
  buttonDisabledText: '#4A4A4A',

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.9)',

  // Transparent
  transparent: 'transparent',

  // White/Black
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
