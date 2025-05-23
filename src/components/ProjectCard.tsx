import React, { useState, useEffect } from 'react';

interface Project {
  name: string;
  logo: string;
  github: string;
  twitter: string;
  telegram: string;
  subcategory?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  animationDelay: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, animationDelay }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Reset image states when project changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [project.name, project.logo]);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Format logo path and handle different extensions
  const getLogoPath = () => {
    if (imageError) {
      // Return a default logo that's guaranteed to exist
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
        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
        style={{
          backgroundColor: 'var(--accent-light)',
          color: 'var(--text-on-accent)'
        }}
      >
        {initials}
      </div>
    );
  };
  
  return (
    <div 
      className="rounded-lg p-4 flex flex-col items-center transition-all cursor-pointer animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderWidth: '1px',
        borderColor: 'var(--card-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: '140px', // Fixed height for consistency
        width: '100%',    // Full width of grid cell
        animationDelay: `${animationDelay}ms`,
        // @ts-ignore - CSS custom property
        '--tw-ring-color': 'var(--focus-ring)'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'var(--accent-light)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-light)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
      }}
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-8 h-8 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--surface-alt)' }}
            ></div>
          </div>
        )}
        
        {imageError ? (
          getFallbackLogo()
        ) : (
          <img 
            src={getLogoPath()} 
            alt={`${project.name} logo`} 
            className={`max-w-full max-h-full object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
      </div>
      <h3 
        className="text-sm font-medium text-center line-clamp-1 w-full" 
        style={{ color: 'var(--primary)' }}
        title={project.name}
      >
        {project.name}
      </h3>
      {project.subcategory && (
        <div 
          className="text-xs text-center mt-1 line-clamp-1 w-full"
          style={{ color: 'var(--primary-light)' }}
        >
          {project.subcategory}
        </div>
      )}
    </div>
  );
};
