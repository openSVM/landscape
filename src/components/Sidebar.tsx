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

  return (
    <div 
      className={`${theme === 'corporate' ? 'corporate-sidebar' : 'sidebar'}`}
      style={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      {sections.map((section) => {
        if (isHeader(section)) {
          return (
            <div 
              key={section.id} 
              className={`${theme === 'corporate' ? 'corporate-sidebar-section' : 'sidebar-section'}`}
            >
              <h3 
                className={`${theme === 'corporate' ? 'corporate-sidebar-title' : 'sidebar-title'}`}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '8px 0',
                  padding: '0 8px'
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
              className={`${theme === 'corporate' ? 'corporate-sidebar-item' : 'sidebar-item'} ${
                isActive(section.id) ? 'active' : ''
              }`}
              onClick={() => onSectionChange(section.id)}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isActive(section.id) 
                  ? (theme === 'dark' ? '#334155' : '#3498db') 
                  : 'transparent',
                color: isActive(section.id)
                  ? (theme === 'dark' ? '#ffffff' : '#ffffff')
                  : (theme === 'dark' ? '#e2e8f0' : '#2c3e50'),
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              <span 
                className={`${theme === 'corporate' ? 'corporate-sidebar-icon' : 'sidebar-icon'}`}
                style={{
                  width: '16px',
                  height: '16px',
                  flexShrink: 0
                }}
              >
                {section.icon}
              </span>
              {section.label}
            </button>
          );
        }
      })}
      <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '8px' }}>
        <div className="theme-indicator" style={{ fontSize: '14px', opacity: 0.7 }}>
          Grayscale Theme
        </div>
        <div className="version" style={{ fontSize: '12px', opacity: 0.5 }}>
          v1.2.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
