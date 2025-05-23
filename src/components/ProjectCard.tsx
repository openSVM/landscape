import React from 'react';

interface ProjectCardProps {
  id: string;
  name: string;
  category: string;
  logo: string;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, category, logo, onClick }) => {
  return (
    <div 
      className="corporate-project-card"
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(id);
        }
      }}
      aria-label={`View details for ${name}`}
    >
      <div className="corporate-project-logo-container">
        {logo ? (
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="corporate-project-logo"
            onError={(e) => {
              // Fallback to placeholder on image load error
              (e.target as HTMLImageElement).src = '/logos/placeholder.svg';
            }}
          />
        ) : (
          <div className="corporate-project-logo-placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="corporate-project-text">
        <h3 className="corporate-project-name">{name}</h3>
        <div className="corporate-project-category">{category}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
