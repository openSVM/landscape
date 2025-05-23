import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { ProjectType } from '../types';

interface CommandPaletteProps {
  projects: ProjectType[];
  categories: { name: string; count: number }[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectType) => void;
  onSelectCategory: (category: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  projects,
  categories,
  isOpen,
  onClose,
  onSelectProject,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredResults, setFilteredResults] = useState<Array<{ type: string; item: any }>>([]);
  
  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      // Show some default suggestions when no query
      const defaultResults = [
        ...categories.slice(0, 3).map(category => ({ 
          type: 'category', 
          item: category 
        })),
        ...projects.slice(0, 5).map(project => ({ 
          type: 'project', 
          item: project 
        }))
      ];
      setFilteredResults(defaultResults);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Filter projects
    const matchedProjects = projects
      .filter(project => 
        project.name.toLowerCase().includes(lowerQuery) || 
        project.category.toLowerCase().includes(lowerQuery) ||
        project.subcategory.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(project => ({ type: 'project', item: project }));
    
    // Filter categories
    const matchedCategories = categories
      .filter(category => 
        category.name.toLowerCase().includes(lowerQuery)
      )
      .map(category => ({ type: 'category', item: category }));
    
    setFilteredResults([...matchedCategories, ...matchedProjects]);
    setActiveIndex(0);
  }, [query, projects, categories]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredResults[activeIndex]) {
          selectResult(filteredResults[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };
  
  // Handle result selection
  const selectResult = (result: { type: string; item: any }) => {
    if (result.type === 'project') {
      // Ensure we properly handle project selection with a small delay
      // to allow state updates to complete before navigation
      setTimeout(() => {
        onSelectProject(result.item);
      }, 50);
    } else if (result.type === 'category') {
      onSelectCategory(result.item.name);
    }
    onClose();
  };
  
  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const inputElement = document.getElementById('command-palette-input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="glass-modal-overlay fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="glass-command-palette w-full max-w-2xl mx-4 animate-slide-down"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center text-gray-500 mr-2">
            <FiSearch className="h-5 w-5" />
          </div>
          <input
            id="command-palette-input"
            type="text"
            className="glass-input w-full text-base focus:outline-none"
            placeholder="Search projects, categories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button 
            className="glass-button ml-2 p-2 rounded-md flex items-center justify-center"
            onClick={onClose}
            aria-label="Close command palette"
          >
            <FiX className="h-5 w-5" />
            <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">ESC</span>
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={`${result.type}-${result.item.name || result.item.id}`}
                className={`flex items-center p-3 rounded-md transition-colors duration-150 cursor-pointer ${
                  index === activeIndex 
                    ? 'glass-effect' 
                    : 'hover:glass-effect'
                }`}
                onClick={() => selectResult(result)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md mr-3">
                  {result.type === 'project' ? (
                    <div className="glass-effect w-full h-full rounded-md flex items-center justify-center">
                      {result.item.name.charAt(0)}
                    </div>
                  ) : (
                    <div className="glass-effect w-full h-full rounded-md flex items-center justify-center">
                      #
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {result.item.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {result.type === 'project' 
                      ? `${result.item.category} › ${result.item.subcategory}`
                      : `${result.item.count} projects`
                    }
                  </div>
                </div>
                <div className="flex-shrink-0 text-gray-400">
                  <FiArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded mr-1">↑</span>
            <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded mr-1">↓</span>
            <span>to navigate</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded mr-1">Enter</span>
            <span>to select</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded mr-1">Esc</span>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
