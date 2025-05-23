import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiAward, FiInfo } from 'react-icons/fi';
import { AIRecommendation, aiService } from '../services/AIService';
import { ProjectType } from '../types';

interface AIRecommendationsProps {
  projects: ProjectType[];
  category?: string;
  onSelectProject: (project: ProjectType) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  projects, 
  category,
  onSelectProject
}) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!projects || projects.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Initialize AI service if needed
        if (projects.length > 0) {
          aiService.initialize(projects, []);
        }
        
        // Get recommendations from AI service
        const results = await aiService.getRecommendations(category, 5);
        setRecommendations(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching AI recommendations:', err);
        setError('Unable to generate recommendations at this time');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [projects, category]);

  if (loading) {
    return (
      <div className="glass-card p-4 animate-pulse">
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
      <div className="glass-card p-4">
        <div className="flex items-center mb-3">
          <FiInfo className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI Recommendations</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="glass-card p-4">
        <div className="flex items-center mb-3">
          <FiAward className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI Recommendations</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          No recommendations available yet. Browse more projects to get personalized suggestions.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in">
      <div className="card-header backdrop-blur-sm">
        <div className="flex items-center">
          <FiAward className="text-accent-blue mr-2" />
          <h3 className="text-sm font-medium">AI-Enhanced Recommendations</h3>
        </div>
      </div>
      
      <div className="card-body">
        <div className="space-y-3">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.project.id}
              className="glass-effect p-3 rounded-md cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
              onClick={() => onSelectProject(recommendation.project)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center mr-3 overflow-hidden">
                  {recommendation.project.logo ? (
                    <img 
                      src={`/logos/${recommendation.project.logo}`} 
                      alt={recommendation.project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logos/default.png';
                      }}
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {recommendation.project.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{recommendation.project.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="text-xs text-gray-500 flex items-center">
                      <FiTrendingUp className="mr-1 h-3 w-3 text-accent-blue" />
                      <span>{Math.round(recommendation.score * 100)}% match</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{recommendation.project.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{recommendation.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
