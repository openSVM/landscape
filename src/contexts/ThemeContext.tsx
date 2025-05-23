import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Local storage key for theme persistence
const THEME_STORAGE_KEY = 'solana-landscape-theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return savedTheme && ['light', 'dark', 'blue'].includes(savedTheme) ? savedTheme : 'dark';
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Apply theme classes to document element
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-blue');
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Add transition class for smooth theme changes
    document.documentElement.classList.add('theme-transition');
    
    // Remove transition class after transition completes to avoid affecting other animations
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
