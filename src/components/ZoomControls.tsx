import React from 'react';

interface ZoomControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomIn, zoomOut, resetZoom }) => {
  return (
    <div className="zoom-controls animate-fade-in">
      <button 
        className="zoom-button hover-scale transition-all duration-200"
        onClick={zoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </button>
      
      <button 
        className="zoom-button hover-scale transition-all duration-200"
        onClick={zoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>
      
      <button 
        className="zoom-button hover-scale transition-all duration-200"
        onClick={resetZoom}
        title="Reset zoom"
        aria-label="Reset zoom"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
      </button>
    </div>
  );
};

export default ZoomControls;
