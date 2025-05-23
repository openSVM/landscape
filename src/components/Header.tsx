import React from 'react';
import { FiMenu, FiSearch, FiExternalLink, FiGithub } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
  openCommandPalette: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, openCommandPalette }) => {
  const handleNavigation = (section: string) => {
    // For internal navigation - use window.location to force view change
    window.location.hash = section;
    
    // Find the specific sidebar link by ID and click it
    const sidebarLinkId = `sidebar-${section}-link`;
    const sidebarLink = document.getElementById(sidebarLinkId);
    
    if (sidebarLink) {
      sidebarLink.click();
    } else {
      // Fallback: try to find by content if ID-based approach fails
      const viewLinks = document.querySelectorAll('.sidebar-link');
      viewLinks.forEach((link) => {
        if (link.textContent?.toLowerCase().includes(section.toLowerCase())) {
          (link as HTMLElement).click();
        }
      });
      
      // Force view update through custom event as last resort
      const event = new CustomEvent('viewChange', { 
        detail: { view: section } 
      });
      window.dispatchEvent(event);
    }
  };

  const openExternalLink = (url: string) => {
    // Ensure URL is properly formatted and open in new tab with security attributes
    try {
      const secureUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(secureUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open external link:', error);
      // Fallback direct navigation as last resort
      window.open('https://opensvm.com', '_blank');
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full px-4 py-3 lg:px-6 theme-transition"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderBottom: '1px solid var(--header-border)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md transition-colors duration-200 hover:bg-opacity-80"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'var(--surface-alt)'
            }}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <img 
              src="/logos/solana.png" 
              alt="Solana Logo" 
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <h1 className="text-base font-semibold leading-tight" style={{ color: 'var(--primary)' }}>Solana</h1>
              <p className="text-xs leading-tight" style={{ color: 'var(--primary-light)' }}>Ecosystem</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <a 
            href="#dashboard"
            className="nav-link px-3 py-2 rounded-md transition-colors hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('dashboard');
            }}
          >
            Dashboard
          </a>
          <a 
            href="#projects"
            className="nav-link px-3 py-2 rounded-md transition-colors hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('projects');
            }}
          >
            Projects
          </a>
          <a 
            href="#statistics"
            className="nav-link px-3 py-2 rounded-md transition-colors hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('statistics');
            }}
          >
            Statistics
          </a>
          <a 
            href="#categories"
            className="nav-link px-3 py-2 rounded-md transition-colors hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('categories');
            }}
          >
            Categories
          </a>
          <a 
            href="https://github.com/openSVM/landscape"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              openExternalLink('https://github.com/openSVM/landscape');
            }}
            aria-label="GitHub Repository"
          >
            <FiGithub className="h-4 w-4" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
          <a 
            href="https://opensvm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              openExternalLink('https://opensvm.com');
            }}
          >
            OpenSVM
            <FiExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors hover:bg-opacity-80 hover:bg-surface-alt"
            style={{
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
            onClick={openCommandPalette}
            aria-label="Search"
          >
            <FiSearch className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Search</span>
            <span className="hidden md:inline command-palette-kbd">⌘K</span>
          </button>
          
          <div className="border-l h-6 mx-1 hidden sm:block" style={{ borderColor: 'var(--border)' }}></div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
