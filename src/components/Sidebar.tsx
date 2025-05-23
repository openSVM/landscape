import React from 'react';
import { FiHome, FiGrid, FiBarChart2, FiFolder, FiStar, FiSettings, FiHelpCircle, FiX } from 'react-icons/fi';
import { CategoryType } from '../types';

interface SidebarProps {
  categories: CategoryType[];
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  activeView, 
  setActiveView, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden" 
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)'
        }}
        aria-label="Sidebar navigation"
      >
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
          <h2 className="text-base font-semibold" style={{ color: 'var(--primary)' }}>Navigation</h2>
          <button 
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              color: 'var(--primary-light)',
              // @ts-ignore - CSS custom property
              '--tw-ring-color': 'var(--focus-ring)'
            }}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
          <h3 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--primary-light)' }}>Main</h3>
          <nav className="mt-2 space-y-1">
            <button 
              className="sidebar-link flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: activeView === 'dashboard' ? 'var(--accent-light)' : 'transparent',
                color: activeView === 'dashboard' ? 'var(--text-on-accent)' : 'var(--primary)',
                // @ts-ignore - CSS custom property
                '--tw-ring-color': 'var(--focus-ring)'
              }}
              onClick={() => {
                setActiveView('dashboard');
                window.location.hash = 'dashboard';
                if (window.innerWidth < 1024) onClose();
              }}
              aria-current={activeView === 'dashboard' ? 'page' : undefined}
              id="sidebar-dashboard-link"
            >
              <FiHome className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </button>
            
            <button 
              className="sidebar-link flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: activeView === 'projects' ? 'var(--accent-light)' : 'transparent',
                color: activeView === 'projects' ? 'var(--text-on-accent)' : 'var(--primary)',
                // @ts-ignore - CSS custom property
                '--tw-ring-color': 'var(--focus-ring)'
              }}
              onClick={() => {
                setActiveView('projects');
                window.location.hash = 'projects';
                if (window.innerWidth < 1024) onClose();
              }}
              aria-current={activeView === 'projects' ? 'page' : undefined}
              id="sidebar-projects-link"
            >
              <FiGrid className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Projects</span>
            </button>
            
            <button 
              className="sidebar-link flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: activeView === 'statistics' ? 'var(--accent-light)' : 'transparent',
                color: activeView === 'statistics' ? 'var(--text-on-accent)' : 'var(--primary)',
                // @ts-ignore - CSS custom property
                '--tw-ring-color': 'var(--focus-ring)'
              }}
              onClick={() => {
                setActiveView('statistics');
                window.location.hash = 'statistics';
                if (window.innerWidth < 1024) onClose();
              }}
              aria-current={activeView === 'statistics' ? 'page' : undefined}
              id="sidebar-statistics-link"
            >
              <FiBarChart2 className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Statistics</span>
            </button>
          </nav>
        </div>
        
        <div className="p-4" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
          <h3 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--primary-light)' }}>Categories</h3>
          <div className="mt-2 max-h-[30vh] overflow-y-auto pr-1 space-y-1">
            <button 
              className="sidebar-link flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: activeView === 'categories' ? 'var(--accent-light)' : 'transparent',
                color: activeView === 'categories' ? 'var(--text-on-accent)' : 'var(--primary)',
                // @ts-ignore - CSS custom property
                '--tw-ring-color': 'var(--focus-ring)'
              }}
              onClick={() => {
                setActiveView('categories');
                window.location.hash = 'categories';
                if (window.innerWidth < 1024) onClose();
              }}
              aria-current={activeView === 'categories' ? 'page' : undefined}
              id="sidebar-categories-link"
            >
              <FiFolder className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">All Categories</span>
            </button>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.name}>
                  <button 
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      color: 'var(--primary)',
                      // @ts-ignore - CSS custom property
                      '--tw-ring-color': 'var(--focus-ring)'
                    }}
                    aria-label={`${category.name} category with ${category.count} projects`}
                    onClick={() => {
                      setActiveView('projects');
                      window.location.hash = 'projects';
                      // Dispatch a custom event to update filters
                      const event = new CustomEvent('updateFilters', {
                        detail: { category: category.name, subcategory: 'all' }
                      });
                      window.dispatchEvent(event);
                      if (window.innerWidth < 1024) onClose();
                    }}
                  >
                    <FiFolder className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--primary-light)' }} />
                    <span className="flex-1 truncate">{category.name}</span>
                    <span 
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ml-auto"
                      style={{
                        backgroundColor: 'var(--surface-alt)',
                        color: 'var(--primary)'
                      }}
                    >
                      {category.count}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-sm p-2" style={{ color: 'var(--primary-light)' }}>No categories available</div>
            )}
          </div>
        </div>
        
        <div className="p-4" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
          <h3 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--primary-light)' }}>Favorites</h3>
          <nav className="mt-2 space-y-1">
            <button 
              className="sidebar-link flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                color: 'var(--primary)',
                // @ts-ignore - CSS custom property
                '--tw-ring-color': 'var(--focus-ring)'
              }}
              onClick={() => {
                setActiveView('projects');
                window.location.hash = 'projects';
                // Dispatch a custom event to update filters for starred projects
                const event = new CustomEvent('updateFilters', {
                  detail: { starred: true }
                });
                window.dispatchEvent(event);
                if (window.innerWidth < 1024) onClose();
              }}
              id="sidebar-starred-link"
            >
              <FiStar className="h-4 w-4 flex-shrink-0 text-yellow-500" />
              <span className="truncate">Starred Projects</span>
            </button>
          </nav>
        </div>
        
        <div className="mt-auto">
          <div className="p-4" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
            <h3 className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--primary-light)' }}>Settings</h3>
            <nav className="mt-2 space-y-1">
              <button 
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  color: 'var(--primary)',
                  // @ts-ignore - CSS custom property
                  '--tw-ring-color': 'var(--focus-ring)'
                }}
              >
                <FiSettings className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Preferences</span>
              </button>
              
              <button 
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  color: 'var(--primary)',
                  // @ts-ignore - CSS custom property
                  '--tw-ring-color': 'var(--focus-ring)'
                }}
              >
                <FiHelpCircle className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Help & Support</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
