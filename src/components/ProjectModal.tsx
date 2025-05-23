import React, { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiGithub, FiTwitter, FiMessageCircle, FiX } from 'react-icons/fi';
import { ProjectType } from '../types';
import RelatedProjects from './RelatedProjects';

interface ProjectModalProps {
  project: ProjectType;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  
  // Close modal when clicking outside
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Fetch all projects for related projects component
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        
        // Extract all projects from the nested structure
        const allProjects: ProjectType[] = [];
        
        if (data && data.categories) {
          data.categories.forEach((category: any) => {
            if (category && category.subcategories) {
              category.subcategories.forEach((subcategory: any) => {
                if (subcategory && subcategory.projects) {
                  subcategory.projects.forEach((project: any) => {
                    allProjects.push({
                      ...project,
                      category: category.name,
                      subcategory: subcategory.name,
                      id: `${category.name}-${subcategory.name}-${project.name}`.replace(/\s+/g, '-').toLowerCase()
                    });
                  });
                }
              });
            }
          });
        }
        
        setProjects(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    fetchProjects();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !contentRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Format logo path and handle different extensions
  const getLogoPath = () => {
    if (imageError) {
      return '/logos/default.png';
    }
    
    if (!project.logo) {
      // Try to create a path based on project name if no logo specified
      return `/logos/${project.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}.png`;
    }
    
    // If logo doesn't include file extension, assume png
    if (!project.logo.includes('.')) {
      return `/logos/${project.logo}.png`;
    }
    
    return `/logos/${project.logo}`;
  };

  // Generate a fallback logo based on project name
  const getFallbackLogo = () => {
    const initials = project.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
      
    return (
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold glass-effect"
      >
        {initials}
      </div>
    );
  };

  // Handle selection of a related project
  const handleSelectRelatedProject = (selectedProject: ProjectType) => {
    // Create a custom event to open the project modal with the new project
    const event = new CustomEvent('openProjectModal', { detail: selectedProject });
    window.dispatchEvent(event);
  };

  return (
    <div 
      ref={modalRef}
      className="glass-modal-overlay fixed inset-0 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={contentRef}
        className="glass-modal max-w-2xl w-full max-h-[90vh] animate-fade-in flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              {imageError ? (
                getFallbackLogo()
              ) : (
                <div className="glass-effect w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={getLogoPath()} 
                    alt={`${project.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>
            <div>
              <h3 
                id="modal-title" 
                className="text-base font-semibold"
              >
                {project.name}
              </h3>
              <div className="flex flex-wrap items-center gap-1 mt-1">
                {project.category && (
                  <span 
                    className="glass-effect inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                  >
                    {project.category}
                  </span>
                )}
                {project.subcategory && (
                  <span 
                    className="glass-effect inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                  >
                    {project.subcategory}
                  </span>
                )}
              </div>
            </div>
            <button 
              className="glass-button ml-auto flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          <div className="flex flex-col">
            <div className="mb-4">
              <h4 
                className="text-xs font-medium mb-2"
              >
                Description
              </h4>
              <p 
                className="text-sm glass-effect p-3 rounded-md"
              >
                {project.description || 
                  `${project.name} is a ${project.subcategory || ''} project in the Solana ecosystem${project.category ? `, focusing on ${project.category.toLowerCase()} solutions` : ''}.`
                }
              </p>
            </div>
            
            <div className="mb-4">
              <h4 
                className="text-xs font-medium mb-2"
              >
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  project.category, 
                  project.subcategory
                ].filter(Boolean).map((tag, index) => (
                  tag && (
                    <span 
                      key={index} 
                      className="glass-effect inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  )
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 
                className="text-xs font-medium mb-2"
              >
                Links
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <a 
                  href={project.website || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs transition-all duration-200 hover:translate-y-[-2px]"
                >
                  <FiExternalLink className="h-3 w-3" />
                  <span>Website</span>
                </a>
                
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <FiGithub className="h-3 w-3" />
                    <span>GitHub</span>
                  </a>
                )}
                
                {project.twitter && (
                  <a 
                    href={project.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <FiTwitter className="h-3 w-3" />
                    <span>Twitter</span>
                  </a>
                )}
                
                {project.telegram && (
                  <a 
                    href={project.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <FiMessageCircle className="h-3 w-3" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* AI-Enhanced Related Projects */}
            {projects.length > 0 && project.id && (
              <div className="mb-4">
                <RelatedProjects
                  projectId={project.id}
                  projects={projects}
                  onSelectProject={handleSelectRelatedProject}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 flex justify-end border-t border-gray-200 dark:border-gray-700">
          <button 
            className="glass-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 py-2 px-4 hover:translate-y-[-2px]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
