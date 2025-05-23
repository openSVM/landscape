import { useState, useEffect, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectsGrid from './components/ProjectsGrid';
import StatisticsPanel from './components/StatisticsPanel';
import AdvancedFilters from './components/AdvancedFilters';
import CommandPalette from './components/CommandPalette';
import EnhancedSearchResults from './components/EnhancedSearchResults';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectType, CategoryType } from './types';

function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [filters, setFilters] = useState({
    category: 'all',
    subcategory: 'all',
    search: '',
    tags: [] as string[]
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Handle the nested structure of the JSON file
        if (!data || !data.categories) {
          throw new Error('Invalid data format: missing categories');
        }
        
        // Flatten the nested structure into projects array
        const allProjects: ProjectType[] = [];
        const categoriesData: CategoryType[] = [];
        
        data.categories.forEach((category: any) => {
          if (!category || !category.name || !Array.isArray(category.subcategories)) {
            return; // Skip invalid categories
          }
          
          const categoryName = category.name;
          const subcategoriesData: {name: string, count: number}[] = [];
          let categoryProjectCount = 0;
          
          category.subcategories.forEach((subcategory: any) => {
            if (!subcategory || !subcategory.name || !Array.isArray(subcategory.projects)) {
              return; // Skip invalid subcategories
            }
            
            const subcategoryName = subcategory.name;
            const subcategoryProjects = subcategory.projects || [];
            const validProjects = subcategoryProjects.filter((p: any) => p && p.name);
            
            // Add each project to the flattened array with category and subcategory info
            validProjects.forEach((project: any) => {
              allProjects.push({
                ...project,
                category: categoryName,
                subcategory: subcategoryName,
                id: `${categoryName}-${subcategoryName}-${project.name}`.replace(/\\s+/g, '-').toLowerCase()
              });
            });
            
            // Add subcategory data
            subcategoriesData.push({
              name: subcategoryName,
              count: validProjects.length
            });
            
            categoryProjectCount += validProjects.length;
          });
          
          // Add category data
          categoriesData.push({
            name: categoryName,
            count: categoryProjectCount,
            subcategories: subcategoriesData
          });
        });
        
        setProjects(allProjects);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err: any) {
        console.error('Error loading data:', err);
        setError(err.message || 'Failed to load data');
        setLoading(false);
      }
    };
    
    fetchData();

  }, []);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Check for cmd+k or ctrl+k
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setCommandPaletteOpen(true);
    }
  }, []);
  
  // Add global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredProjects = projects.filter((project: ProjectType) => {
    // Filter by category
    if (filters.category !== 'all' && project.category !== filters.category) {
      return false;
    }
    
    // Filter by subcategory
    if (filters.subcategory !== 'all' && project.subcategory !== filters.subcategory) {
      return false;
    }
    
    // Filter by search term
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags.length > 0) {
      const projectTags = project.tags || [];
      if (!filters.tags.some(tag => projectTags.includes(tag))) {
        return false;
      }
    }
    
    return true;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            className="mt-4 btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="enterprise-layout">
        <Header 
          toggleSidebar={toggleSidebar} 
          openCommandPalette={() => setCommandPaletteOpen(true)}
        />
        
        <div className="flex">
          <Sidebar 
            categories={categories} 
            activeView={activeView}
            setActiveView={setActiveView}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="enterprise-main">
            <div className="mb-6">
              <AdvancedFilters 
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              {filters.search && (
                <EnhancedSearchResults 
                  query={filters.search}
                  projects={projects}
                  onSelectProject={(project) => {
                    // Create a custom event to open the project modal
                    const event = new CustomEvent('openProjectModal', { detail: project });
                    window.dispatchEvent(event);
                  }}
                />
              )}
            </div>
            
            <div id="dashboard" className={activeView === 'dashboard' ? 'block' : 'hidden'}>
              <Dashboard 
                projects={filteredProjects}
                categories={categories}
              />
            </div>
            
            <div id="statistics" className={activeView === 'statistics' ? 'block' : 'hidden'}>
              <StatisticsPanel 
                projects={projects}
                categories={categories}
              />
            </div>
            
            <div id="projects" className={activeView === 'projects' ? 'block' : 'hidden'}>
              <ProjectsGrid 
                projects={filteredProjects}
                loading={loading}
              />
            </div>

            <div id="categories" className={activeView === 'categories' ? 'block' : 'hidden'}>
              <div className="p-4 rounded-lg border" style={{ 
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.name} className="enterprise-card p-4">
                      <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--primary)' }}>{category.name}</h3>
                      <p className="text-sm mb-3" style={{ color: 'var(--primary-light)' }}>{category.count} projects</p>
                      <div className="space-y-1">
                        {category.subcategories?.map((sub) => (
                          <div key={sub.name} className="flex justify-between text-sm">
                            <span style={{ color: 'var(--primary)' }}>{sub.name}</span>
                            <span style={{ color: 'var(--primary-light)' }}>{sub.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Command Palette for cmd+k fast search */}
        <CommandPalette 
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          projects={projects}
          categories={categories.map(cat => ({ name: cat.name, count: cat.count }))}
          onSelectProject={(project) => {
            setActiveView('projects');
            handleFilterChange({ 
              category: project.category,
              subcategory: project.subcategory,
              search: project.name
            });
          }}
          onSelectCategory={(category) => {
            setActiveView('projects');
            handleFilterChange({ 
              category: category,
              subcategory: 'all',
              search: ''
            });
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
