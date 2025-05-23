import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce search to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle escape key to clear search
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div 
      className={`glass-effect relative flex items-center w-full rounded-md ${
        isFocused ? 'ring-2 ring-accent' : ''
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-center w-10 text-gray-500">
        <FiSearch className="h-4 w-4" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="glass-input w-full py-3 px-0 border-0 focus:ring-0 focus:outline-none text-sm"
        aria-label="Search projects"
      />
      
      {searchTerm && (
        <button 
          onClick={handleClear}
          className="flex items-center justify-center w-10 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
