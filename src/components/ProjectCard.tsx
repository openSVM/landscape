import React from 'react';
import { Project } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { theme } = useTheme();
  const { name, category, logo } = project;

  // Extract first letter of project name for placeholder
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div 
      className={`${theme === 'corporate' ? 'corporate-project-card' : 'project-card'}`}
      onClick={onClick}
      style={{
        height: '40px',
        minHeight: '40px',
        maxHeight: '40px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transition: 'all 0.2s ease'
      }}
    >
      <div 
        className={`${theme === 'corporate' ? 'corporate-project-logo-container' : 'project-logo-container'}`}
        style={{
          width: '28px',
          height: '28px',
          margin: '0 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {logo ? (
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className={`${theme === 'corporate' ? 'corporate-project-logo' : 'project-logo'}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        ) : (
          <div 
            className={`${theme === 'corporate' ? 'corporate-project-logo-placeholder' : 'project-logo-placeholder'}`}
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: theme === 'dark' ? '#334155' : '#3498db',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {firstLetter}
          </div>
        )}
      </div>
      <div 
        className={`${theme === 'corporate' ? 'corporate-project-text' : 'project-text'}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          flex: 1
        }}
      >
        <div 
          className={`${theme === 'corporate' ? 'corporate-project-name' : 'project-name'}`}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: theme === 'dark' ? '#e2e8f0' : '#2c3e50',
            margin: '0 8px 0 0',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {name}
        </div>
        <div 
          className={`${theme === 'corporate' ? 'corporate-project-category' : 'project-category'}`}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: theme === 'dark' ? '#94a3b8' : '#7f8c8d',
            margin: 0,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {category}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
