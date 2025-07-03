/**
 * Health Buddy App Color Scheme
 * Primary colors are health-focused with a professional medical aesthetic
 */

const primaryColor = '#0a7ea4';

const secondaryColor = '#4CAF50';
const accentColor = '#FF5722';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
    card: '#F5F7F9',
    border: '#E0E0E0',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#ffffff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ffffff',
    primary: '#1A9FC0',
    secondary: '#66BB6A',
    accent: '#FF7043',
    success: '#66BB6A',
    warning: '#FFD54F',
    error: '#EF5350',
    info: '#42A5F5',
    card: '#1E2021',
    border: '#2D2F31',
  },
};
