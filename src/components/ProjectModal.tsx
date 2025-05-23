import React from 'react';
import { FiX, FiExternalLink, FiGithub, FiTwitter, FiLink } from 'react-icons/fi';
import { ProjectType } from '../types';

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  if (!project) return null;
  
  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };
  
  const handleExternalLink = (url?: string) => {
    if (!url) return;
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="corporate-modal-overlay" onClick={onClose}>
      <div 
        className="corporate-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="corporate-modal-header">
          <div className="corporate-modal-title-area">
            <div className="corporate-modal-logo">
              {project.logo ? (
                <img 
                  src={project.logo} 
                  alt={`${project.name} logo`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logos/placeholder.svg';
                  }}
                />
              ) : (
                <div className="corporate-modal-logo-placeholder">
                  {project.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div>
              <h2 id="project-modal-title" className="corporate-modal-title">{project.name}</h2>
              <div className="corporate-modal-category">{project.category}</div>
            </div>
          </div>
          
          <button 
            className="corporate-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="corporate-modal-tabs">
          <button 
            className={`corporate-modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`corporate-modal-tab ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button 
            className={`corporate-modal-tab ${activeTab === 'related' ? 'active' : ''}`}
            onClick={() => setActiveTab('related')}
          >
            Related Projects
          </button>
        </div>
        
        <div className="corporate-modal-body">
          {activeTab === 'overview' && (
            <div className="corporate-modal-overview">
              <p className="corporate-modal-description">{project.description}</p>
              
              {project.tags && project.tags.length > 0 && (
                <div className="corporate-modal-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="corporate-tag">{tag}</span>
                  ))}
                </div>
              )}
              
              <div className="corporate-modal-links">
                {project.website && (
                  <button 
                    className="corporate-link-button"
                    onClick={() => handleExternalLink(project.website)}
                  >
                    <FiLink className="corporate-link-icon" />
                    <span>Website</span>
                    <FiExternalLink className="corporate-external-icon" />
                  </button>
                )}
                
                {project.github && (
                  <button 
                    className="corporate-link-button"
                    onClick={() => handleExternalLink(project.github)}
                  >
                    <FiGithub className="corporate-link-icon" />
                    <span>GitHub</span>
                    <FiExternalLink className="corporate-external-icon" />
                  </button>
                )}
                
                {project.twitter && (
                  <button 
                    className="corporate-link-button"
                    onClick={() => handleExternalLink(`https://twitter.com/${project.twitter}`)}
                  >
                    <FiTwitter className="corporate-link-icon" />
                    <span>Twitter</span>
                    <FiExternalLink className="corporate-external-icon" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'metrics' && (
            <div className="corporate-modal-metrics">
              <div className="corporate-metrics-grid">
                <div className="corporate-metric-card">
                  <div className="corporate-metric-title">Total Value Locked</div>
                  <div className="corporate-metric-value">
                    {project.metrics?.tvl !== undefined 
                      ? `$${formatNumber(project.metrics.tvl)}` 
                      : 'N/A'}
                  </div>
                </div>
                
                <div className="corporate-metric-card">
                  <div className="corporate-metric-title">Active Users</div>
                  <div className="corporate-metric-value">
                    {formatNumber(project.metrics?.users)}
                  </div>
                </div>
                
                <div className="corporate-metric-card">
                  <div className="corporate-metric-title">Transactions</div>
                  <div className="corporate-metric-value">
                    {formatNumber(project.metrics?.transactions)}
                  </div>
                </div>
              </div>
              
              <div className="corporate-metrics-note">
                <p>Data updated daily. Last update: May 23, 2025</p>
              </div>
            </div>
          )}
          
          {activeTab === 'related' && (
            <div className="corporate-modal-related">
              <p className="corporate-related-message">
                Related projects feature coming soon.
              </p>
            </div>
          )}
        </div>
        
        <div className="corporate-modal-footer">
          <button 
            className="corporate-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
