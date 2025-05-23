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
    <div className="corporate-statistics-panel">
      <div className="corporate-statistics-header">
        <h2 className="corporate-statistics-title">Ecosystem Statistics</h2>
        <div className="corporate-statistics-subtitle">Real-time metrics and growth indicators</div>
      </div>
      
      <div className="corporate-stats-grid">
        <div className="corporate-stat-card">
          <div className="corporate-stat-header">
            <div className="corporate-stat-icon">
              <FiBarChart2 />
            </div>
            <div className="corporate-stat-title">Total Projects</div>
          </div>
          <div className="corporate-stat-value">{formatNumber(data.totalProjects)}</div>
          <div className="corporate-stat-description">
            Across all categories
          </div>
        </div>
        
        <div className="corporate-stat-card">
          <div className="corporate-stat-header">
            <div className="corporate-stat-icon">
              <FiUsers />
            </div>
            <div className="corporate-stat-title">Active Users</div>
          </div>
          <div className="corporate-stat-value">{formatNumber(data.activeUsers)}</div>
          <div className="corporate-stat-description">
            Monthly active users
          </div>
        </div>
        
        <div className="corporate-stat-card">
          <div className="corporate-stat-header">
            <div className="corporate-stat-icon">
              <FiActivity />
            </div>
            <div className="corporate-stat-title">Transactions</div>
          </div>
          <div className="corporate-stat-value">{formatNumber(data.totalTransactions)}</div>
          <div className="corporate-stat-description">
            Total processed transactions
          </div>
        </div>
        
        <div className="corporate-stat-card">
          <div className="corporate-stat-header">
            <div className="corporate-stat-icon">
              <FiTrendingUp />
            </div>
            <div className="corporate-stat-title">Growth Rate</div>
          </div>
          <div className="corporate-stat-value">{formatPercentage(data.growthRate)}</div>
          <div className="corporate-stat-description">
            Month-over-month ecosystem growth
          </div>
        </div>
      </div>
      
      <div className="corporate-category-stats">
        <h3 className="corporate-category-stats-title">Category Performance</h3>
        
        <div className="corporate-category-table">
          <div className="corporate-category-table-header">
            <div className="corporate-category-name-header">Category</div>
            <div className="corporate-category-count-header">Projects</div>
            <div className="corporate-category-growth-header">Growth</div>
          </div>
          
          {data.categoryBreakdown.map((category, index) => (
            <div key={index} className="corporate-category-table-row">
              <div className="corporate-category-name">{category.name}</div>
              <div className="corporate-category-count">{category.count}</div>
              <div className={`corporate-category-growth ${category.growth >= 0 ? 'positive' : 'negative'}`}>
                {category.growth >= 0 ? (
                  <FiArrowUp className="corporate-growth-icon" />
                ) : (
                  <FiArrowDown className="corporate-growth-icon" />
                )}
                {formatPercentage(category.growth)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="corporate-statistics-footer">
        <div className="corporate-statistics-note">
          Data updated daily. Last update: May 23, 2025
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
