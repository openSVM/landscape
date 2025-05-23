import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiChevronDown, FiMoon, FiSun, FiDroplet, FiCircle } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getThemeIcon = () => {
    switch (theme) {
      case 'grayscale':
        return <FiCircle className="h-5 w-5" />;
      case 'dark':
        return <FiMoon className="h-5 w-5" />;
      case 'light':
        return <FiSun className="h-5 w-5" />;
      case 'blue':
        return <FiDroplet className="h-5 w-5" />;
      default:
        return <FiCircle className="h-5 w-5" />;
    }
  };
  
  const getThemeName = () => {
    switch (theme) {
      case 'grayscale':
        return 'Dark';
      case 'dark':
        return 'Dark';
      case 'light':
        return 'Light';
      case 'blue':
        return 'Blue';
      default:
        return 'Grayscale';
    }
  };

  // Get theme-specific styles
  const getButtonStyles = (buttonTheme: string) => {
    const isActive = theme === buttonTheme;
    const baseStyles = "flex items-center w-full px-4 py-2 text-sm text-left transition-colors duration-150";
    
    // Theme-specific hover and active states
    if (buttonTheme === 'grayscale') {
      return `${baseStyles} ${isActive ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200/50'}`;
    } else if (buttonTheme === 'dark') {
      return `${baseStyles} ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700/20'}`;
    } else if (buttonTheme === 'light') {
      return `${baseStyles} ${isActive ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200/50'}`;
    } else if (buttonTheme === 'blue') {
      return `${baseStyles} ${isActive ? 'bg-blue-100 text-blue-900' : 'hover:bg-blue-50'}`;
    }
    
    return baseStyles;
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="theme-dropdown-button flex items-center gap-1.5 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: 'var(--surface-alt)',
          color: 'var(--primary)',
          borderColor: 'var(--border)',
          // @ts-ignore - CSS custom property
          '--tw-ring-color': 'var(--focus-ring)'
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {getThemeIcon()}
        <span className="hidden sm:inline-block">{getThemeName()}</span>
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className="theme-dropdown absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 animate-fadeIn"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            borderWidth: '1px'
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={getButtonStyles('grayscale')}
              onClick={() => {
                setTheme('grayscale');
                setIsOpen(false);
              }}
              role="menuitem"
              style={{ color: theme === 'grayscale' ? 'var(--primary)' : 'inherit' }}
            >
              <FiCircle className="mr-2 h-4 w-4" />
              <span>Grayscale Theme</span>
            </button>
            
            <button
              className={getButtonStyles('dark')}
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
              role="menuitem"
              style={{ color: theme === 'dark' ? 'var(--primary)' : 'inherit' }}
            >
              <FiMoon className="mr-2 h-4 w-4" />
              <span>Dark Theme</span>
            </button>
            
            <button
              className={getButtonStyles('light')}
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
              role="menuitem"
              style={{ color: theme === 'light' ? 'var(--primary)' : 'inherit' }}
            >
              <FiSun className="mr-2 h-4 w-4" />
              <span>Light Theme</span>
            </button>
            
            <button
              className={getButtonStyles('blue')}
              onClick={() => {
                setTheme('blue');
                setIsOpen(false);
              }}
              role="menuitem"
              style={{ color: theme === 'blue' ? 'var(--primary)' : 'inherit' }}
            >
              <FiDroplet className="mr-2 h-4 w-4" />
              <span>Blue Theme</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
