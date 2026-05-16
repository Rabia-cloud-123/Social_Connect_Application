// ─────────────────────────────────────────────
// File: mobile/src/theme/index.js
// Design tokens — import these everywhere
// instead of hardcoding colors/sizes
// ─────────────────────────────────────────────

export const COLORS = {
  primary: '#4F46E5',      // Indigo — main brand color
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',

  secondary: '#EC4899',    // Pink — accent / likes
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',

  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
};

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};