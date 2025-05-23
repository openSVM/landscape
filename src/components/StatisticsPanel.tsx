import React from 'react';
import { FiBarChart2, FiUsers, FiActivity, FiTrendingUp, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { CategoryType, ProjectType } from '../types';

interface StatisticsPanelProps {
  projects: ProjectType[];
  categories: CategoryType[];
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ projects, categories }) => {
  // Calculate statistics from projects and categories
  const totalProjects = projects.length;
  const activeUsers = 250000; // Example data
  const totalTransactions = 15000000; // Example data
  const growthRate = 12.5; // Example data

  // Generate category breakdown with growth data
  const categoryBreakdown = categories.map(category => ({
    name: category.name,
    count: category.count,
    growth: Math.random() * 30 - 10 // Random growth between -10% and +20% for demo
  }));

  // Prepare data object to match the component's expected structure
  const data = {
    totalProjects,
    activeUsers,
    totalTransactions,
    growthRate,
    categoryBreakdown
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  return (
    <div className="enterprise-card p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ecosystem Statistics</h2>
        <div className="text-sm text-gray-500">Real-time metrics and growth indicators</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="enterprise-card p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center text-white mr-3">
              <FiBarChart2 size={20} />
            </div>
            <div className="text-sm font-medium text-gray-500">Total Projects</div>
          </div>
          <div className="text-2xl font-bold mb-1">{formatNumber(data.totalProjects)}</div>
          <div className="text-xs text-gray-500">
            Across all categories
          </div>
        </div>
        
        <div className="enterprise-card p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-md bg-green-500 flex items-center justify-center text-white mr-3">
              <FiUsers size={20} />
            </div>
            <div className="text-sm font-medium text-gray-500">Active Users</div>
          </div>
          <div className="text-2xl font-bold mb-1">{formatNumber(data.activeUsers)}</div>
          <div className="text-xs text-gray-500">
            Monthly active users
          </div>
        </div>
        
        <div className="enterprise-card p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-md bg-purple-500 flex items-center justify-center text-white mr-3">
              <FiActivity size={20} />
            </div>
            <div className="text-sm font-medium text-gray-500">Transactions</div>
          </div>
          <div className="text-2xl font-bold mb-1">{formatNumber(data.totalTransactions)}</div>
          <div className="text-xs text-gray-500">
            Total processed transactions
          </div>
        </div>
        
        <div className="enterprise-card p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center text-white mr-3">
              <FiTrendingUp size={20} />
            </div>
            <div className="text-sm font-medium text-gray-500">Growth Rate</div>
          </div>
          <div className="text-2xl font-bold mb-1">{formatPercentage(data.growthRate)}</div>
          <div className="text-xs text-gray-500">
            Month-over-month ecosystem growth
          </div>
        </div>
      </div>
      
      <div className="enterprise-card p-6 shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Category Performance</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Category</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-gray-500">Projects</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-gray-500">Growth</th>
              </tr>
            </thead>
            <tbody>
              {data.categoryBreakdown.map((category, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{category.name}</td>
                  <td className="py-3 px-4 text-right">{category.count}</td>
                  <td className={`py-3 px-4 text-right font-medium flex items-center justify-end ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.growth >= 0 ? (
                      <FiArrowUp className="mr-1" />
                    ) : (
                      <FiArrowDown className="mr-1" />
                    )}
                    {formatPercentage(category.growth)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 text-right">
        Data updated daily. Last update: May 23, 2025
      </div>
    </div>
  );
};

export default StatisticsPanel;
