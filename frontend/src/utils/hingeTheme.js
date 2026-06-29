/**
 * Hinge App Design Theme
 * Warm, elegant, card-based premium minimalism
 */

export const hingeTheme = {
  colors: {
    primary: '#FF6B5B',      // Warm coral (Hinge signature)
    secondary: '#FFB0A3',    // Soft peachy
    accent: '#F97B7B',       // Warm pink
    dark: '#1A1A1A',         // Deep charcoal
    light: '#FFFFFF',        // Pure white
    lightBg: '#F8F8F8',      // Soft gray-white
    text: '#2D2D2D',         // Dark text
    textLight: '#7A7A7A',    // Light gray text
    border: '#E8E8E8',       // Soft border
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },

  shadows: {
    light: '0 1px 3px rgba(0,0,0,0.08)',
    medium: '0 4px 12px rgba(0,0,0,0.12)',
    hover: '0 8px 24px rgba(255,107,91,0.15)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  transitions: {
    smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s ease-out',
  },
};

export function applyHingeTheme() {
  const root = document.documentElement;
  const theme = hingeTheme;

  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--dark', theme.colors.dark);
  root.style.setProperty('--light', theme.colors.light);
  root.style.setProperty('--light-bg', theme.colors.lightBg);
  root.style.setProperty('--text', theme.colors.text);
  root.style.setProperty('--text-light', theme.colors.textLight);
  root.style.setProperty('--border', theme.colors.border);
}

export default hingeTheme;
