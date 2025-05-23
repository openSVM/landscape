import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="enterprise-footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <img src="/logos/solana-logo.svg" alt="Solana" className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Solana Ecosystem Landscape</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              A comprehensive visualization of the Solana blockchain ecosystem
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://solana.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-accent-blue transition-colors"
            >
              Solana.com
            </a>
            
            <a 
              href="https://github.com/solana-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-accent-blue transition-colors flex items-center gap-1"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-accent-blue transition-colors"
            >
              About
            </a>
            
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-accent-blue transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Solana Ecosystem Landscape. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-xs text-gray-500 hover:text-accent-blue transition-colors"
              >
                Privacy Policy
              </a>
              
              <a 
                href="#" 
                className="text-xs text-gray-500 hover:text-accent-blue transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
