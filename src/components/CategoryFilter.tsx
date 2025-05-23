import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="category-filter filter-container" style={{ 
      backgroundColor: 'var(--surface-alt)',
      borderColor: 'var(--border)'
    }}>
      <select 
        className="focus:ring-2 theme-ring"
        style={{
          backgroundColor: 'var(--surface)',
          color: 'var(--primary)',
          borderColor: 'var(--border)'
        }}
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="filter-icon" style={{ color: 'var(--primary-light)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
};
