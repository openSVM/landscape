import React, { useEffect, useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { RelatedProject, aiService } from '../services/AIService';
import { ProjectType } from '../types';

interface RelatedProjectsProps {
  projectId: string;
  projects: ProjectType[];
  onSelectProject: (project: ProjectType) => void;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ 
  projectId, 
  projects,
  onSelectProject
}) => {
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      if (!projectId || !projects || projects.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Initialize AI service if needed
        if (projects.length > 0) {
          aiService.initialize(projects, []);
        }
        
        // Get related projects from AI service
        const results = await aiService.getRelatedProjects(projectId, 4);
        setRelatedProjects(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching related projects:', err);
        setError('Unable to find related projects at this time');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProjects();
  }, [projectId, projects]);

  if (loading) {
    return (
      <div className="mt-4 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <h4 className="text-xs font-medium mb-2">Related Projects</h4>
        <div className="p-3 text-xs text-gray-500 text-center glass-effect rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 animate-fade-in">
      <h4 className="text-xs font-medium mb-2">AI-Suggested Similar Projects</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedProjects.map((related) => (
          <div 
            key={related.project.id}
            className="glass-effect p-3 rounded-md cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
            onClick={() => onSelectProject(related.project)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full glass-effect flex items-center justify-center mr-2 overflow-hidden">
                {related.project.logo ? (
                  <img 
                    src={`/logos/${related.project.logo}`} 
                    alt={related.project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logos/default.png';
                    }}
                  />
                ) : (
                  <span className="text-xs font-medium">
                    {related.project.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h5 className="text-sm font-medium truncate">{related.project.name}</h5>
                <div className="flex items-center mt-0.5">
                  <div className="text-xs text-gray-500 flex items-center">
                    <FiLink className="mr-1 h-3 w-3 text-accent-blue" />
                    <span>{Math.round(related.similarityScore * 100)}% similar</span>
                  </div>
                </div>
              </div>
            </div>
            {related.commonFactors.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 truncate">
                  {related.commonFactors[0]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
