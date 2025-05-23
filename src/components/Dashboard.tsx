import React from 'react';
import { FiBarChart2, FiUsers, FiLayers, FiActivity, FiTrendingUp, FiGlobe, FiPieChart } from 'react-icons/fi';
import { ProjectType, CategoryType } from '../types';
import AIRecommendations from './AIRecommendations';
import TrendInsights from './TrendInsights';

interface DashboardProps {
  projects: ProjectType[];
  categories: CategoryType[];
}

const Dashboard: React.FC<DashboardProps> = ({ projects, categories }) => {
  // Ensure we have data to work with
  if (!projects || !categories || projects.length === 0 || categories.length === 0) {
    return (
      <div className="enterprise-card p-8 text-center">
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--primary)' }}>Loading dashboard data...</h3>
        <p style={{ color: 'var(--primary-light)' }}>Please wait while we gather ecosystem information.</p>
      </div>
    );
  }
  
  // Calculate statistics
  const totalProjects = projects.length;
  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0);
  
  // Handle project selection for recommendations
  const handleSelectProject = (project: ProjectType) => {
    // Create a custom event to open the project modal
    const event = new CustomEvent('openProjectModal', { detail: project });
    window.dispatchEvent(event);
  };
  
  return (
    <div className="flex flex-col">
      <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>Solana Ecosystem Dashboard</h2>
      
      <div className="flex flex-col gap-6">
        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="enterprise-card hover-lift p-3">
            <div className="flex items-start">
              <div className="stat-icon" style={{ color: 'var(--primary-light)' }}>
                <FiLayers />
              </div>
              <div>
                <h3 className="stat-title" style={{ color: 'var(--primary-light)' }}>Total Projects</h3>
                <p className="stat-value" style={{ color: 'var(--primary)' }}>{totalProjects}</p>
                <p className="stat-desc" style={{ color: 'var(--primary-light)' }}>Across all categories</p>
              </div>
            </div>
          </div>
          
          <div className="enterprise-card hover-lift p-3">
            <div className="flex items-start">
              <div className="stat-icon" style={{ color: 'var(--primary-light)' }}>
                <FiBarChart2 />
              </div>
              <div>
                <h3 className="stat-title" style={{ color: 'var(--primary-light)' }}>Categories</h3>
                <p className="stat-value" style={{ color: 'var(--primary)' }}>{totalCategories}</p>
                <p className="stat-desc" style={{ color: 'var(--primary-light)' }}>Main ecosystem segments</p>
              </div>
            </div>
          </div>
          
          <div className="enterprise-card hover-lift p-3">
            <div className="flex items-start">
              <div className="stat-icon" style={{ color: 'var(--primary-light)' }}>
                <FiPieChart />
              </div>
              <div>
                <h3 className="stat-title" style={{ color: 'var(--primary-light)' }}>Subcategories</h3>
                <p className="stat-value" style={{ color: 'var(--primary)' }}>{totalSubcategories}</p>
                <p className="stat-desc" style={{ color: 'var(--primary-light)' }}>Specialized project groups</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI-enhanced content and standard content in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - AI Recommendations */}
          <div className="md:col-span-1">
            <AIRecommendations 
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          </div>
          
          {/* Middle column - Category Distribution */}
          <div className="md:col-span-1">
            <div className="enterprise-card">
              <div className="card-header py-2">
                <div className="flex items-center">
                  <FiActivity className="mr-2 h-5 w-5" style={{ color: 'var(--primary-light)' }} />
                  <h3 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Category Distribution</h3>
                </div>
              </div>
              
              <div className="card-body p-3">
                <div className="flex flex-col space-y-3">
                  {categories.slice(0, 6).map((category) => (
                    <div key={category.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>{category.name}</span>
                        <span className="text-sm" style={{ color: 'var(--primary-light)' }}>{category.count} projects</span>
                      </div>
                      <div className="rounded-full h-2 w-full overflow-hidden" style={{ backgroundColor: 'var(--surface-alt)' }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(category.count / totalProjects) * 100}%`,
                            backgroundColor: 'var(--accent)'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - AI Trend Insights */}
          <div className="md:col-span-1">
            <TrendInsights 
              projects={projects}
              categories={categories}
            />
          </div>
        </div>
        
        {/* Growth metrics and highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="enterprise-card">
            <div className="card-header py-2">
              <div className="flex items-center">
                <FiTrendingUp className="mr-2 h-5 w-5" style={{ color: 'var(--primary-light)' }} />
                <h3 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Ecosystem Growth</h3>
              </div>
            </div>
            
            <div className="card-body p-3">
              <div className="flex items-center mb-3">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary)' }}>+28</div>
                <div className="ml-4">
                  <div className="text-sm" style={{ color: 'var(--primary-light)' }}>New projects</div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium" style={{ color: 'var(--success)' }}>+12%</span>
                    <span className="ml-1 text-xs" style={{ color: 'var(--primary-light)' }}>vs previous</span>
                  </div>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="growth-chart">
                    <svg viewBox="0 0 100 50" className="h-12 w-24">
                      <path
                        d="M0,50 L10,45 L20,48 L30,40 L40,42 L50,35 L60,30 L70,25 L80,20 L90,15 L100,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ color: 'var(--accent)' }}
                      />
                      <circle cx="100" cy="10" r="3" fill="currentColor" style={{ color: 'var(--accent)' }} />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--primary-light)' }}>DeFi Growth</h4>
                <div className="rounded-full h-2 w-full overflow-hidden mb-1" style={{ backgroundColor: 'var(--surface-alt)' }}>
                  <div className="h-2 rounded-full" style={{ width: '65%', backgroundColor: 'var(--success)' }}></div>
                </div>
                <div className="flex justify-between text-xs" style={{ color: 'var(--primary-light)' }}>
                  <span>Previous: 22</span>
                  <span>Current: 30</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="enterprise-card">
            <div className="card-header py-2">
              <div className="flex items-center">
                <FiGlobe className="mr-2 h-5 w-5" style={{ color: 'var(--primary-light)' }} />
                <h3 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Ecosystem Highlights</h3>
              </div>
            </div>
            
            <div className="card-body p-3">
              <div className="mb-2">
                <div className="flex items-center mb-1">
                  <div className="highlight-icon" style={{ color: 'var(--primary-light)' }}>
                    <FiUsers className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Growing Developer Community</h4>
                </div>
                <p className="text-xs" style={{ color: 'var(--primary-light)' }}>
                  The Solana ecosystem continues to attract developers with its high performance.
                </p>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center mb-1">
                  <div className="highlight-icon" style={{ color: 'var(--primary-light)' }}>
                    <FiLayers className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>SVM Networks Expansion</h4>
                </div>
                <p className="text-xs" style={{ color: 'var(--primary-light)' }}>
                  SVM Networks are rapidly expanding with new Layer 2 solutions.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <div className="highlight-icon" style={{ color: 'var(--primary-light)' }}>
                    <FiActivity className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Mobile Adoption</h4>
                </div>
                <p className="text-xs" style={{ color: 'var(--primary-light)' }}>
                  SVM Mobile category shows strong growth with new wallets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
