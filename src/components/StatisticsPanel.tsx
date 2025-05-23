import React from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { ProjectType, CategoryType } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface StatisticsPanelProps {
  projects: ProjectType[];
  categories: CategoryType[];
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ projects, categories }) => {
  // Ensure we have data to work with
  if (!projects || !categories || projects.length === 0 || categories.length === 0) {
    return (
      <div className="enterprise-card p-8 text-center">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Loading statistics...</h3>
        <p className="text-gray-500">Please wait while we analyze ecosystem data.</p>
      </div>
    );
  }

  // Prepare data for category distribution pie chart
  const categoryData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(231, 233, 237, 0.8)',
          'rgba(149, 165, 166, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(231, 233, 237, 1)',
          'rgba(149, 165, 166, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for subcategory counts
  const subcategoryData = {
    labels: categories.slice(0, 5).map(cat => cat.name),
    datasets: [
      {
        label: 'Number of Subcategories',
        data: categories.slice(0, 5).map(cat => cat.subcategories?.length || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  // Calculate statistics
  const totalProjects = projects.length;
  const avgProjectsPerCategory = Math.round(totalProjects / categories.length);
  const largestCategory = categories.reduce((max, cat) => 
    (cat.count > (max?.count || 0)) ? cat : max, categories[0]);
  const smallestCategory = categories.reduce((min, cat) => 
    (cat.count < (min?.count || Infinity)) ? cat : min, categories[0]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Ecosystem Statistics</h2>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="enterprise-card hover-lift">
          <div className="flex items-start">
            <div className="stat-icon">
              <FiBarChart2 />
            </div>
            <div>
              <h3 className="stat-title">Total Projects</h3>
              <p className="stat-value">{totalProjects}</p>
              <p className="stat-desc">Across all categories</p>
            </div>
          </div>
        </div>
        
        <div className="enterprise-card hover-lift">
          <div className="flex items-start">
            <div className="stat-icon">
              <FiPieChart />
            </div>
            <div>
              <h3 className="stat-title">Categories</h3>
              <p className="stat-value">{categories.length}</p>
              <p className="stat-desc">Main ecosystem segments</p>
            </div>
          </div>
        </div>
        
        <div className="enterprise-card hover-lift">
          <div className="flex items-start">
            <div className="stat-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h3 className="stat-title">Avg. Projects</h3>
              <p className="stat-value">{avgProjectsPerCategory}</p>
              <p className="stat-desc">Per category</p>
            </div>
          </div>
        </div>
        
        <div className="enterprise-card hover-lift">
          <div className="flex items-start">
            <div className="stat-icon">
              <FiDownload />
            </div>
            <div>
              <h3 className="stat-title">Data Updated</h3>
              <p className="stat-value">May 2025</p>
              <p className="stat-desc">Last refresh</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="enterprise-card">
          <div className="card-header">
            <h3 className="text-sm font-medium">Category Distribution</h3>
          </div>
          <div className="card-body chart-animate">
            <div className="h-64 flex items-center justify-center">
              <Pie data={categoryData} />
            </div>
          </div>
        </div>
        
        <div className="enterprise-card">
          <div className="card-header">
            <h3 className="text-sm font-medium">Subcategories by Category</h3>
          </div>
          <div className="card-body chart-animate">
            <div className="h-64 flex items-center justify-center">
              <Bar options={barOptions} data={subcategoryData} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category insights */}
      <div className="enterprise-card mb-8">
        <div className="card-header">
          <h3 className="text-sm font-medium">Category Insights</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Largest Category</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">{largestCategory.count}</span>
                </div>
                <div>
                  <p className="font-medium">{largestCategory.name}</p>
                  <p className="text-sm text-gray-500">{Math.round((largestCategory.count / totalProjects) * 100)}% of ecosystem</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Smallest Category</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">{smallestCategory.count}</span>
                </div>
                <div>
                  <p className="font-medium">{smallestCategory.name}</p>
                  <p className="text-sm text-gray-500">{Math.round((smallestCategory.count / totalProjects) * 100)}% of ecosystem</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category details table */}
      <div className="enterprise-card">
        <div className="card-header">
          <h3 className="text-sm font-medium">Detailed Category Breakdown</h3>
        </div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="table-header">Category</th>
                <th className="table-header">Projects</th>
                <th className="table-header">Subcategories</th>
                <th className="table-header">% of Ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category) => (
                <tr key={category.name} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="table-cell font-medium">{category.name}</td>
                  <td className="table-cell">{category.count}</td>
                  <td className="table-cell">{category.subcategories?.length || 0}</td>
                  <td className="table-cell">{Math.round((category.count / totalProjects) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
