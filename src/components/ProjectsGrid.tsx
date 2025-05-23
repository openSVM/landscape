import React from 'react';
import { ProjectType } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsGridProps {
  projects: ProjectType[];
  loading: boolean;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, loading }) => {
  const [selectedProject, setSelectedProject] = React.useState<ProjectType | null>(null);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-surface border border-gray-200 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium text-gray-800 mb-2">No projects found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
      </div>
    );
  }
  
  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
  };
  
  const closeModal = () => {
    setSelectedProject(null);
  };
  
  // Format logo path and handle different extensions
  const getLogoPath = (project: ProjectType) => {
    if (!project.logo) {
      // Try to create a path based on project name if no logo specified
      return `/logos/${project.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    }
    
    // If logo doesn't include file extension, assume png
    if (!project.logo.includes('.')) {
      return `/logos/${project.logo}.png`;
    }
    
    return `/logos/${project.logo}`;
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
        <div className="text-sm text-gray-500">
          Showing {projects.length} of {projects.length} projects
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="projects-grid h-full overflow-hidden">
          {projects.slice(0, 30).map((project, index) => (
            <div 
              key={project.id || project.name} 
              className="project-card"
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProjectClick(project);
                }
              }}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="project-logo-container">
                <img 
                  src={getLogoPath(project)}
                  alt={`${project.name} logo`}
                  className="project-logo"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logos/default.png';
                  }}
                />
              </div>
              <h3 className="project-name" title={project.name}>{project.name}</h3>
              {project.subcategory && (
                <div className="project-category">{project.subcategory}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProjectsGrid;
