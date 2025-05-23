import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiBarChart2, FiActivity } from 'react-icons/fi';
import { TrendInsight, aiService } from '../services/AIService';
import { ProjectType, CategoryType } from '../types';

interface TrendInsightsProps {
  projects: ProjectType[];
  categories: CategoryType[];
}

const TrendInsights: React.FC<TrendInsightsProps> = ({ projects, categories }) => {
  const [insights, setInsights] = useState<TrendInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendInsights = async () => {
      if (!projects || projects.length === 0 || !categories || categories.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Initialize AI service if needed
        aiService.initialize(projects, categories);
        
        // Get trend insights from AI service
        const results = await aiService.getTrendInsights(3);
        setInsights(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching AI trend insights:', err);
        setError('Unable to generate trend insights at this time');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendInsights();
  }, [projects, categories]);

  if (loading) {
    return (
      <div className="glass-card p-4 animate-pulse">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4">
        <div className="flex items-center mb-3">
          <FiTrendingUp className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI Trend Insights</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="glass-card p-4">
        <div className="flex items-center mb-3">
          <FiTrendingUp className="text-gray-500 mr-2" />
          <h3 className="text-sm font-medium">AI Trend Insights</h3>
        </div>
        <div className="p-3 text-sm text-gray-500 text-center">
          No trend insights available yet. Check back later for AI-powered ecosystem analysis.
        </div>
      </div>
    );
  }

  // Helper function to get trend icon and color
  const getTrendVisuals = (trend: 'rising' | 'stable' | 'declining') => {
    switch (trend) {
      case 'rising':
        return {
          icon: <FiTrendingUp className="h-5 w-5" />,
          color: 'text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900/30'
        };
      case 'stable':
        return {
          icon: <FiBarChart2 className="h-5 w-5" />,
          color: 'text-blue-500',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        };
      case 'declining':
        return {
          icon: <FiActivity className="h-5 w-5" />,
          color: 'text-orange-500',
          bgColor: 'bg-orange-100 dark:bg-orange-900/30'
        };
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <div className="card-header backdrop-blur-sm">
        <div className="flex items-center">
          <FiTrendingUp className="text-accent-blue mr-2" />
          <h3 className="text-sm font-medium">AI-Enhanced Trend Insights</h3>
        </div>
      </div>
      
      <div className="card-body">
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const { icon, color, bgColor } = getTrendVisuals(insight.trend);
            
            return (
              <div 
                key={index}
                className="glass-effect p-3 rounded-md transition-all duration-200"
              >
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full ${bgColor} ${color} flex items-center justify-center mr-2`}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{insight.category}</h4>
                    <div className="flex items-center">
                      <span className={`text-xs ${color} font-medium`}>
                        {insight.trend.charAt(0).toUpperCase() + insight.trend.slice(1)}
                      </span>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendInsights;
