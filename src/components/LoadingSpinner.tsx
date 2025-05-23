import React from 'react';
import '../animations.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-accent-blue rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-500">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;
