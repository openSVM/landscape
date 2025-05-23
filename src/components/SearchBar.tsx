import React from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAdvancedFilters: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  onAdvancedFilters,
  placeholder = "Search projects, categories, or tags..."
}) => {
  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="corporate-search-container">
      <div className="corporate-search-input-wrapper">
        <FiSearch className="corporate-search-icon" />
        
        <input
          type="text"
          className="corporate-search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        
        {searchTerm && (
          <button 
            className="corporate-search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FiX className="corporate-clear-icon" />
          </button>
        )}
      </div>
      
      <button
        className="corporate-filter-button"
        onClick={onAdvancedFilters}
        aria-label="Advanced filters"
      >
        <FiFilter className="corporate-filter-icon" />
        <span className="corporate-filter-text">Filters</span>
      </button>
    </div>
  );
};

export default SearchBar;
