import React, { useEffect, useState } from 'react';
import { FiLink, FiSearch } from 'react-icons/fi';
import { AISearchResult, aiService } from '../services/AIService';
import { ProjectType } from '../types';

interface EnhancedSearchResultsProps {
  query: string;
  projects: ProjectType[];
  onSelectProject: (project: ProjectType) => void;
}

const EnhancedSearchResults: React.FC<EnhancedSearchResultsProps> = ({ 
  query, 
  projects,
  onSelectProject
}) => {
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query || query.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        // Initialize AI service if needed
        if (projects.length > 0) {
          aiService.initialize(projects, []);
        }
        
        // Get enhanced search results from AI service
        const searchResults = await aiService.getEnhancedSearchResults(query);
        setResults(searchResults);
        setError(null);
      } catch (err) {
        console.error('Error fetching AI search results:', err);
        setError('Unable to process search results at this time');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, projects]);

  if (!query || query.trim().length < 2) {
    return null;
  }

  if (loading) {
    return (
      <div className="glass-card p-4 animate-pulse mt-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-300 dark:bg-gray-700 mr-2"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4 mt-4">
        <div className="flex items-center mb-3">
          <FiSearch className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI-Enhanced Search</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="glass-card p-4 mt-4">
        <div className="flex items-center mb-3">
          <FiSearch className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI-Enhanced Search</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          No results found for "{query}". Try a different search term.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in mt-4">
      <div className="card-header backdrop-blur-sm">
        <div className="flex items-center">
          <FiSearch className="text-accent-blue mr-2" />
          <h3 className="text-sm font-medium">AI-Enhanced Search Results</h3>
        </div>
      </div>
      
      <div className="card-body">
        <div className="space-y-3">
          {results.map((result) => (
            <div 
              key={result.project.id}
              className="glass-effect p-3 rounded-md cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
              onClick={() => onSelectProject(result.project)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center mr-3 overflow-hidden">
                  {result.project.logo ? (
                    <img 
                      src={`/logos/${result.project.logo}`} 
                      alt={result.project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logos/default.png';
                      }}
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {result.project.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{result.project.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="text-xs text-gray-500 flex items-center">
                      <FiLink className="mr-1 h-3 w-3 text-accent-blue" />
                      <span>{Math.round(result.relevanceScore * 100)}% relevant</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{result.project.category} / {result.project.subcategory}</span>
                  </div>
                </div>
              </div>
              {result.matchedTerms.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.matchedTerms.slice(0, 3).map((term, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full glass-effect">
                      {term}
                    </span>
                  ))}
                  {result.matchedTerms.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full glass-effect">
                      +{result.matchedTerms.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchResults;
