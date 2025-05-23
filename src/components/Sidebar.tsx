import React, { useState } from 'react';
import { FiHome, FiGrid, FiBarChart2, FiTag, FiStar, FiSettings, FiGithub } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import PreferencesModal from './PreferencesModal';
import { CategoryType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onClose: () => void;
  categories?: CategoryType[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  activeView, 
  setActiveView,
  onClose
}) => {
  const { theme } = useTheme();
  const [showPreferences, setShowPreferences] = useState(false);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
      onClose();
    }
  };

  const openGitHub = () => {
    window.open('https://github.com/openSVM/landscape', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={`corporate-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="corporate-sidebar-content">
          <div className="corporate-sidebar-section">
            <h2 className="corporate-sidebar-title">MAIN</h2>
            <nav className="corporate-sidebar-nav">
              <button
                id="sidebar-dashboard-link"
                className={`corporate-sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleViewChange('dashboard')}
              >
                <FiHome className="corporate-sidebar-icon" />
                <span>Dashboard</span>
              </button>
              
              <button
                id="sidebar-projects-link"
                className={`corporate-sidebar-item ${activeView === 'projects' ? 'active' : ''}`}
                onClick={() => handleViewChange('projects')}
              >
                <FiGrid className="corporate-sidebar-icon" />
                <span>Projects</span>
              </button>
              
              <button
                id="sidebar-statistics-link"
                className={`corporate-sidebar-item ${activeView === 'statistics' ? 'active' : ''}`}
                onClick={() => handleViewChange('statistics')}
              >
                <FiBarChart2 className="corporate-sidebar-icon" />
                <span>Statistics</span>
              </button>
            </nav>
          </div>
          
          <div className="corporate-sidebar-section">
            <h2 className="corporate-sidebar-title">CATEGORIES</h2>
            <nav className="corporate-sidebar-nav">
              <button
                id="sidebar-categories-link"
                className={`corporate-sidebar-item ${activeView === 'categories' ? 'active' : ''}`}
                onClick={() => handleViewChange('categories')}
              >
                <FiTag className="corporate-sidebar-icon" />
                <span>All Categories</span>
              </button>
            </nav>
          </div>
          
          <div className="corporate-sidebar-section">
            <h2 className="corporate-sidebar-title">FAVORITES</h2>
            <nav className="corporate-sidebar-nav">
              <button
                id="sidebar-starred-link"
                className={`corporate-sidebar-item ${activeView === 'starred' ? 'active' : ''}`}
                onClick={() => handleViewChange('starred')}
              >
                <FiStar className="corporate-sidebar-icon" />
                <span>Starred Projects</span>
              </button>
            </nav>
          </div>
          
          <div className="corporate-sidebar-section">
            <h2 className="corporate-sidebar-title">SETTINGS</h2>
            <nav className="corporate-sidebar-nav">
              <button
                className="corporate-sidebar-item"
                onClick={() => setShowPreferences(true)}
              >
                <FiSettings className="corporate-sidebar-icon" />
                <span>Preferences</span>
              </button>
              
              <button
                className="corporate-sidebar-item"
                onClick={openGitHub}
              >
                <FiGithub className="corporate-sidebar-icon" />
                <span>GitHub</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="corporate-sidebar-footer">
          <div className="corporate-sidebar-theme-indicator">
            <div className={`corporate-theme-dot ${theme}`}></div>
            <span className="corporate-theme-name">{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</span>
          </div>
          <div className="corporate-sidebar-version">v1.2.0</div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="corporate-sidebar-overlay"
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        ></div>
      )}
      
      {showPreferences && (
        <PreferencesModal onClose={() => setShowPreferences(false)} />
      )}
    </>
  );
};

export default Sidebar;
