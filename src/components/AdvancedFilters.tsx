import React from 'react';
import { CategoryType } from '../types';

interface AdvancedFiltersProps {
  categories: CategoryType[];
  filters: {
    category: string;
    subcategory: string;
    search: string;
    tags: string[];
  };
  onFilterChange: (filters: Partial<{
    category: string;
    subcategory: string;
    search: string;
    tags: string[];
  }>) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  categories,
  filters,
  onFilterChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [availableSubcategories, setAvailableSubcategories] = React.useState<Array<{name: string, count: number}>>([]);
  
  React.useEffect(() => {
    if (filters.category === 'all') {
      setAvailableSubcategories([]);
    } else {
      const category = categories.find(c => c.name === filters.category);
      setAvailableSubcategories(category?.subcategories || []);
    }
  }, [filters.category, categories]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ 
      category: e.target.value,
      subcategory: 'all' // Reset subcategory when category changes
    });
  };
  
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ subcategory: e.target.value });
  };
  
  const handleRemoveTag = (tag: string) => {
    onFilterChange({
      tags: filters.tags.filter(t => t !== tag)
    });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      category: 'all',
      subcategory: 'all',
      search: '',
      tags: []
    });
  };
  
  return (
    <div className="glass-card animate-fade-in">
      <div className="card-header backdrop-blur-sm">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">Advanced Filters</h3>
        </div>
        <button 
          className="glass-button text-sm px-3 py-1 rounded-md hover:bg-opacity-20"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      <div className="card-body">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <div className="glass-effect flex items-center rounded-md overflow-hidden">
              <div className="flex items-center justify-center w-10 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input 
                type="text" 
                className="glass-input w-full py-3 px-0 border-0 focus:ring-0 focus:outline-none text-sm" 
                placeholder="Search projects..." 
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select 
                className="glass-effect appearance-none rounded-md py-3 pl-3 pr-10 text-sm"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                {categories && categories.length > 0 ? categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </option>
                )) : null}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            {filters.category !== 'all' && availableSubcategories && availableSubcategories.length > 0 && (
              <div className="relative">
                <select 
                  className="glass-effect appearance-none rounded-md py-3 pl-3 pr-10 text-sm"
                  value={filters.subcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="all">All Subcategories</option>
                  {availableSubcategories.map(subcategory => (
                    <option key={subcategory.name} value={subcategory.name}>
                      {subcategory.name} ({subcategory.count})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 animate-slide-down">
            <div className="glass-effect p-4 rounded-md">
              <div className="flex flex-wrap gap-2">
                {filters.tags && filters.tags.length > 0 ? (
                  filters.tags.map(tag => (
                    <div key={tag} className="glass-effect px-3 py-1.5 rounded-full flex items-center">
                      <span>{tag}</span>
                      <button 
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No active tags</div>
                )}
              </div>
              
              {(filters.category !== 'all' || filters.subcategory !== 'all' || filters.search || (filters.tags && filters.tags.length > 0)) && (
                <button 
                  className="glass-button mt-3 px-3 py-1.5 rounded-md text-sm"
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilters;
