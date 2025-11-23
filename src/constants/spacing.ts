/**
 * MotoMinder Spacing System
 * Consistent spacing scale for margins, paddings, gaps
 */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
  '5xl': 96,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const IconSize = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
} as const;

export const ScreenPadding = {
  horizontal: Spacing.base,
  vertical: Spacing.lg,
} as const;
