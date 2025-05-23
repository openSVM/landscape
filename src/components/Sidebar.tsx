import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiGrid, FiBarChart2, FiTag, FiStar, FiSettings, FiGithub } from 'react-icons/fi';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { theme } = useTheme();

  const sections = [
    { id: 'main', label: 'MAIN', items: [] },
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FiGrid size={16} /> },
    { id: 'statistics', label: 'Statistics', icon: <FiBarChart2 size={16} /> },
    { id: 'categories', label: 'CATEGORIES', items: [] },
    { id: 'all-categories', label: 'All Categories', icon: <FiTag size={16} /> },
    { id: 'favorites', label: 'FAVORITES', items: [] },
    { id: 'starred-projects', label: 'Starred Projects', icon: <FiStar size={16} /> },
    { id: 'settings', label: 'SETTINGS', items: [] },
    { id: 'preferences', label: 'Preferences', icon: <FiSettings size={16} /> },
    { id: 'github', label: 'GitHub', icon: <FiGithub size={16} /> },
  ];

  const isHeader = (section: any) => section.items !== undefined;
  const isActive = (id: string) => activeSection === id;
  
  // Use a conditional to determine class names based on theme
  const isGrayscale = theme === 'grayscale';
  const isDark = theme === 'dark';

  return (
    <div 
      className={isGrayscale ? 'sidebar' : 'corporate-sidebar'}
      style={{
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
        height: '100%',
        minWidth: '200px',
        transition: 'all 0.3s ease'
      }}
    >
      {sections.map((section) => {
        if (isHeader(section)) {
          return (
            <div 
              key={section.id} 
              className={isGrayscale ? 'sidebar-section' : 'corporate-sidebar-section'}
              style={{
                marginTop: section.id !== 'main' ? '16px' : '0',
                marginBottom: '4px'
              }}
            >
              <h3 
                className={isGrayscale ? 'sidebar-title' : 'corporate-sidebar-title'}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '0',
                  padding: '0 8px',
                  color: isDark ? '#94a3b8' : '#64748b'
                }}
              >
                {section.label}
              </h3>
            </div>
          );
        } else {
          return (
            <button
              key={section.id}
              className={`${isGrayscale ? 'sidebar-item' : 'corporate-sidebar-item'} ${
                isActive(section.id) ? 'active' : ''
              }`}
              onClick={() => onSectionChange(section.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                backgroundColor: isActive(section.id) 
                  ? (isDark ? '#334155' : '#3498db') 
                  : 'transparent',
                color: isActive(section.id)
                  ? (isDark ? '#ffffff' : '#ffffff')
                  : (isDark ? '#e2e8f0' : '#2c3e50'),
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontWeight: 500,
                fontSize: '14px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span 
                className={isGrayscale ? 'sidebar-icon' : 'corporate-sidebar-icon'}
                style={{
                  width: '16px',
                  height: '16px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {section.icon}
              </span>
              {section.label}
              
              {/* Active indicator bar */}
              {isActive(section.id) && (
                <span 
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bottom: '0',
                    width: '3px',
                    backgroundColor: isDark ? '#60a5fa' : '#2563eb',
                    borderRadius: '0 2px 2px 0'
                  }}
                />
              )}
            </button>
          );
        }
      })}
      <div className="sidebar-footer" style={{ 
        marginTop: 'auto', 
        padding: '16px 8px',
        borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
        marginTop: '24px'
      }}>
        <div className="theme-indicator" style={{ 
          fontSize: '14px', 
          opacity: 0.7,
          fontWeight: 500,
          marginBottom: '4px'
        }}>
          Grayscale Theme
        </div>
        <div className="version" style={{ 
          fontSize: '12px', 
          opacity: 0.5,
          fontWeight: 400
        }}>
          v1.2.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
