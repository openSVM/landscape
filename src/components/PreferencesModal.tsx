import React, { useState } from 'react';
import { FiX, FiSun, FiMoon, FiDroplet, FiEye, FiLayout, FiSettings } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

interface PreferencesModalProps {
  onClose: () => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl rounded-lg shadow-xl transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            borderWidth: '1px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            background: 'var(--surface-alt)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between rounded-t-lg p-4 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>
              <FiSettings className="inline-block mr-2" />
              Preferences
            </h2>
            <button
              className="rounded-full p-1 transition-colors hover:bg-opacity-80"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--primary)'
              }}
              onClick={onClose}
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex h-[70vh] max-h-[500px]">
            {/* Sidebar */}
            <div 
              className="w-48 border-r p-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <nav className="space-y-1">
                <button
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors ${
                    activeTab === 'appearance' ? 'bg-opacity-80' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'appearance' ? 'var(--accent-light)' : 'transparent',
                    color: activeTab === 'appearance' ? 'var(--text-on-accent)' : 'var(--primary)'
                  }}
                  onClick={() => setActiveTab('appearance')}
                >
                  <FiEye className="mr-2 h-4 w-4" />
                  Appearance
                </button>
                <button
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors ${
                    activeTab === 'layout' ? 'bg-opacity-80' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'layout' ? 'var(--accent-light)' : 'transparent',
                    color: activeTab === 'layout' ? 'var(--text-on-accent)' : 'var(--primary)'
                  }}
                  onClick={() => setActiveTab('layout')}
                >
                  <FiLayout className="mr-2 h-4 w-4" />
                  Layout
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'appearance' && (
                <div>
                  <h3 className="mb-4 text-lg font-medium" style={{ color: 'var(--primary)' }}>Theme</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Dark Theme */}
                    <div 
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        theme === 'dark' ? 'ring-2' : 'hover:border-opacity-80'
                      }`}
                      style={{
                        borderColor: theme === 'dark' ? 'var(--accent)' : 'var(--border)',
                        backgroundColor: 'var(--surface)',
                        // @ts-ignore - CSS custom property
                        '--tw-ring-color': 'var(--accent)',
                      }}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="mb-3 flex justify-between">
                        <FiMoon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                        {theme === 'dark' && (
                          <div 
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: 'var(--accent)' }}
                          ></div>
                        )}
                      </div>
                      <h4 className="font-medium" style={{ color: 'var(--primary)' }}>Dark</h4>
                      <p className="mt-1 text-sm" style={{ color: 'var(--primary-light)' }}>
                        Dark background with light text
                      </p>
                    </div>
                    
                    {/* Light Theme */}
                    <div 
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        theme === 'light' ? 'ring-2' : 'hover:border-opacity-80'
                      }`}
                      style={{
                        borderColor: theme === 'light' ? 'var(--accent)' : 'var(--border)',
                        backgroundColor: 'var(--surface)',
                        // @ts-ignore - CSS custom property
                        '--tw-ring-color': 'var(--accent)',
                      }}
                      onClick={() => setTheme('light')}
                    >
                      <div className="mb-3 flex justify-between">
                        <FiSun className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                        {theme === 'light' && (
                          <div 
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: 'var(--accent)' }}
                          ></div>
                        )}
                      </div>
                      <h4 className="font-medium" style={{ color: 'var(--primary)' }}>Light</h4>
                      <p className="mt-1 text-sm" style={{ color: 'var(--primary-light)' }}>
                        Light background with dark text
                      </p>
                    </div>
                    
                    {/* Blue Theme */}
                    <div 
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        theme === 'blue' ? 'ring-2' : 'hover:border-opacity-80'
                      }`}
                      style={{
                        borderColor: theme === 'blue' ? 'var(--accent)' : 'var(--border)',
                        backgroundColor: 'var(--surface)',
                        // @ts-ignore - CSS custom property
                        '--tw-ring-color': 'var(--accent)',
                      }}
                      onClick={() => setTheme('blue')}
                    >
                      <div className="mb-3 flex justify-between">
                        <FiDroplet className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                        {theme === 'blue' && (
                          <div 
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: 'var(--accent)' }}
                          ></div>
                        )}
                      </div>
                      <h4 className="font-medium" style={{ color: 'var(--primary)' }}>Blue</h4>
                      <p className="mt-1 text-sm" style={{ color: 'var(--primary-light)' }}>
                        Blue-tinted background with dark text
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-medium" style={{ color: 'var(--primary)' }}>Animations</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enable-animations"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={true}
                      />
                      <label htmlFor="enable-animations" className="ml-2 block text-sm" style={{ color: 'var(--primary)' }}>
                        Enable animations and transitions
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'layout' && (
                <div>
                  <h3 className="mb-4 text-lg font-medium" style={{ color: 'var(--primary)' }}>Display Options</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium" style={{ color: 'var(--primary)' }}>
                        Default View
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 sm:text-sm"
                        style={{
                          backgroundColor: 'var(--surface)',
                          color: 'var(--primary)',
                          borderColor: 'var(--border)',
                          // @ts-ignore - CSS custom property
                          '--tw-ring-color': 'var(--accent)',
                        }}
                        defaultValue="dashboard"
                      >
                        <option value="dashboard">Dashboard</option>
                        <option value="projects">Projects</option>
                        <option value="statistics">Statistics</option>
                        <option value="categories">Categories</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium" style={{ color: 'var(--primary)' }}>
                        Projects Per Page
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 sm:text-sm"
                        style={{
                          backgroundColor: 'var(--surface)',
                          color: 'var(--primary)',
                          borderColor: 'var(--border)',
                          // @ts-ignore - CSS custom property
                          '--tw-ring-color': 'var(--accent)',
                        }}
                        defaultValue="12"
                      >
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="compact-view"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={false}
                      />
                      <label htmlFor="compact-view" className="ml-2 block text-sm" style={{ color: 'var(--primary)' }}>
                        Use compact view for projects
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="auto-collapse"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={true}
                      />
                      <label htmlFor="auto-collapse" className="ml-2 block text-sm" style={{ color: 'var(--primary)' }}>
                        Auto-collapse sidebar on mobile
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div 
            className="flex items-center justify-end space-x-2 rounded-b-lg border-t p-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              className="rounded-md px-4 py-2 text-sm transition-colors"
              style={{
                backgroundColor: 'var(--surface-alt)',
                color: 'var(--primary)',
              }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md px-4 py-2 text-sm transition-colors"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--text-on-accent)',
              }}
              onClick={() => {
                // Save preferences logic would go here
                onClose();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
