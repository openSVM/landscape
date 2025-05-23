// AI Service for processing project data and generating recommendations
import { ProjectType, CategoryType } from '../types';

// Types for AI-enhanced results
export interface AIRecommendation {
  project: ProjectType;
  score: number;
  reason: string;
}

export interface TrendInsight {
  category: string;
  trend: 'rising' | 'stable' | 'declining';
  confidence: number;
  description: string;
}

export interface RelatedProject {
  project: ProjectType;
  similarityScore: number;
  commonFactors: string[];
}

export interface AISearchResult {
  project: ProjectType;
  relevanceScore: number;
  matchedTerms: string[];
}

class AIService {
  private projects: ProjectType[] = [];
  private categories: CategoryType[] = [];
  private userInteractions: Record<string, number> = {};
  
  // Initialize the service with project and category data
  initialize(projects: ProjectType[], categories: CategoryType[]) {
    this.projects = projects;
    this.categories = categories;
    console.log('AI Service initialized with', projects.length, 'projects and', categories.length, 'categories');
    return this;
  }
  
  // Record user interaction with a project to improve recommendations
  recordInteraction(projectId: string, interactionType: 'view' | 'click' | 'search') {
    if (!projectId) return;
    
    const weight = interactionType === 'view' ? 1 : interactionType === 'click' ? 3 : 2;
    this.userInteractions[projectId] = (this.userInteractions[projectId] || 0) + weight;
  }
  
  // Get personalized project recommendations based on user history and preferences
  async getRecommendations(
    category?: string, 
    limit: number = 5
  ): Promise<AIRecommendation[]> {
    // Simulate AI processing time
    await this.simulateProcessingDelay(300, 800);
    
    if (!this.projects.length) {
      return [];
    }
    
    // Filter by category if specified
    const candidateProjects = category && category !== 'all' 
      ? this.projects.filter(p => p.category === category)
      : this.projects;
    
    if (!candidateProjects.length) {
      return [];
    }
    
    // Calculate recommendation scores based on multiple factors
    const scoredProjects = candidateProjects.map(project => {
      // Base score starts at a random value to simulate AI variability
      let score = 0.5 + (Math.random() * 0.3);
      
      // Factor 1: User interaction history
      const interactionScore = project.id ? this.userInteractions[project.id] || 0 : 0;
      score += interactionScore * 0.1;
      
      // Factor 2: Project completeness (projects with more data are scored higher)
      const completenessScore = this.calculateCompletenessScore(project);
      score += completenessScore * 0.2;
      
      // Factor 3: Category popularity
      const categoryPopularity = this.getCategoryPopularity(project.category);
      score += categoryPopularity * 0.15;
      
      // Generate a reason for the recommendation
      const reason = this.generateRecommendationReason(project, {
        interactionScore,
        completenessScore,
        categoryPopularity
      });
      
      return {
        project,
        score,
        reason
      };
    });
    
    // Sort by score and return top recommendations
    return scoredProjects
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
  
  // Get AI-enhanced search results that go beyond simple keyword matching
  async getEnhancedSearchResults(
    query: string,
    limit: number = 10
  ): Promise<AISearchResult[]> {
    // Simulate AI processing time
    await this.simulateProcessingDelay(200, 600);
    
    if (!query || !this.projects.length) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/);
    
    // Calculate relevance scores for each project
    const results = this.projects.map(project => {
      // Exact name match has highest priority
      const nameScore = project.name.toLowerCase().includes(normalizedQuery) ? 0.8 : 0;
      
      // Category and subcategory matches
      const categoryScore = project.category.toLowerCase().includes(normalizedQuery) ? 0.5 : 0;
      const subcategoryScore = project.subcategory.toLowerCase().includes(normalizedQuery) ? 0.6 : 0;
      
      // Description match
      const descriptionScore = project.description && 
        project.description.toLowerCase().includes(normalizedQuery) ? 0.4 : 0;
      
      // Term matching (partial matches)
      const matchedTerms: string[] = [];
      let termScore = 0;
      
      // Check each search term against project fields
      queryTerms.forEach(term => {
        if (term.length < 3) return; // Skip very short terms
        
        if (project.name.toLowerCase().includes(term)) {
          matchedTerms.push(`name: ${term}`);
          termScore += 0.3;
        }
        
        if (project.category.toLowerCase().includes(term)) {
          matchedTerms.push(`category: ${term}`);
          termScore += 0.2;
        }
        
        if (project.subcategory.toLowerCase().includes(term)) {
          matchedTerms.push(`subcategory: ${term}`);
          termScore += 0.25;
        }
        
        if (project.description && project.description.toLowerCase().includes(term)) {
          matchedTerms.push(`description: ${term}`);
          termScore += 0.15;
        }
        
        // Check tags if available
        if (project.tags && project.tags.some(tag => tag.toLowerCase().includes(term))) {
          matchedTerms.push(`tag: ${term}`);
          termScore += 0.35;
        }
      });
      
      // Calculate final relevance score
      const relevanceScore = Math.min(
        1.0, // Cap at 1.0
        nameScore + categoryScore + subcategoryScore + descriptionScore + (termScore / queryTerms.length)
      );
      
      return {
        project,
        relevanceScore,
        matchedTerms
      };
    });
    
    // Filter out low relevance results and sort by score
    return results
      .filter(result => result.relevanceScore > 0.1)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }
  
  // Get related projects based on similarity analysis
  async getRelatedProjects(
    projectId: string,
    limit: number = 4
  ): Promise<RelatedProject[]> {
    // Simulate AI processing time
    await this.simulateProcessingDelay(400, 900);
    
    const sourceProject = this.projects.find(p => p.id === projectId);
    if (!sourceProject || !this.projects.length) {
      return [];
    }
    
    // Calculate similarity scores for all other projects
    const relatedProjects = this.projects
      .filter(p => p.id !== projectId) // Exclude the source project
      .map(project => {
        // Calculate similarity based on multiple factors
        const commonFactors: string[] = [];
        let similarityScore = 0;
        
        // Factor 1: Same category
        if (project.category === sourceProject.category) {
          similarityScore += 0.3;
          commonFactors.push(`Same category: ${project.category}`);
        }
        
        // Factor 2: Same subcategory
        if (project.subcategory === sourceProject.subcategory) {
          similarityScore += 0.4;
          commonFactors.push(`Same subcategory: ${project.subcategory}`);
        }
        
        // Factor 3: Common tags
        if (project.tags && sourceProject.tags) {
          const commonTags = project.tags.filter(tag => 
            sourceProject.tags?.includes(tag)
          );
          
          if (commonTags.length > 0) {
            similarityScore += 0.05 * commonTags.length;
            commonFactors.push(`Common tags: ${commonTags.join(', ')}`);
          }
        }
        
        // Factor 4: Name similarity (simple check for common words)
        const projectWords = project.name.toLowerCase().split(/\s+/);
        const sourceWords = sourceProject.name.toLowerCase().split(/\s+/);
        const commonWords = projectWords.filter(word => 
          word.length > 3 && sourceWords.includes(word)
        );
        
        if (commonWords.length > 0) {
          similarityScore += 0.1 * commonWords.length;
          commonFactors.push(`Similar name elements`);
        }
        
        // Add a small random factor to simulate AI variability
        similarityScore += Math.random() * 0.1;
        
        // Cap at 1.0
        similarityScore = Math.min(1.0, similarityScore);
        
        return {
          project,
          similarityScore,
          commonFactors
        };
      });
    
    // Sort by similarity score and return top results
    return relatedProjects
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);
  }
  
  // Get AI-identified trends in the ecosystem
  async getTrendInsights(limit: number = 3): Promise<TrendInsight[]> {
    // Simulate AI processing time
    await this.simulateProcessingDelay(500, 1000);
    
    if (!this.categories.length) {
      return [];
    }
    
    // Generate trend insights based on category data
    const insights: TrendInsight[] = this.categories.map(category => {
      // Determine trend direction (using randomness to simulate AI analysis)
      const trendValue = Math.random();
      const trend: 'rising' | 'stable' | 'declining' = 
        trendValue > 0.6 ? 'rising' : 
        trendValue > 0.3 ? 'stable' : 'declining';
      
      // Calculate confidence level (higher for categories with more projects)
      const confidence = 0.5 + (Math.min(category.count, 50) / 100);
      
      // Generate description based on trend
      const description = this.generateTrendDescription(category.name, trend, category.count);
      
      return {
        category: category.name,
        trend,
        confidence,
        description
      };
    });
    
    // Sort by confidence and return top insights
    return insights
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, limit);
  }
  
  // Private helper methods
  
  private calculateCompletenessScore(project: ProjectType): number {
    let score = 0;
    
    // Check for presence of various fields
    if (project.description && project.description.length > 10) score += 0.3;
    if (project.website) score += 0.2;
    if (project.github) score += 0.15;
    if (project.twitter) score += 0.1;
    if (project.telegram) score += 0.1;
    if (project.logo) score += 0.15;
    
    return score;
  }
  
  private getCategoryPopularity(categoryName: string): number {
    const category = this.categories.find(c => c.name === categoryName);
    if (!category) return 0;
    
    // Calculate popularity based on project count relative to total
    const totalProjects = this.projects.length;
    return category.count / totalProjects;
  }
  
  private generateRecommendationReason(
    project: ProjectType, 
    scores: {
      interactionScore: number;
      completenessScore: number;
      categoryPopularity: number;
    }
  ): string {
    // Generate a human-readable reason for the recommendation
    const reasons = [];
    
    if (scores.interactionScore > 0) {
      reasons.push("based on your recent activity");
    }
    
    if (scores.completenessScore > 0.5) {
      reasons.push("well-documented project");
    }
    
    if (scores.categoryPopularity > 0.2) {
      reasons.push(`popular ${project.category} category`);
    }
    
    // Add project-specific reasons
    if (project.github) {
      reasons.push("active development");
    }
    
    if (project.description && project.description.length > 100) {
      reasons.push("comprehensive information");
    }
    
    // If we have multiple reasons, use the top 2
    if (reasons.length > 2) {
      reasons.splice(2);
    }
    
    // If we have no reasons, provide a generic one
    if (reasons.length === 0) {
      reasons.push("matches your interests");
    }
    
    return `Recommended for ${reasons.join(" and ")}`;
  }
  
  private generateTrendDescription(category: string, trend: 'rising' | 'stable' | 'declining', count: number): string {
    if (trend === 'rising') {
      return `The ${category} sector is showing strong growth with ${count} projects and increasing developer activity.`;
    } else if (trend === 'stable') {
      return `The ${category} sector remains stable with ${count} established projects maintaining consistent development.`;
    } else {
      return `The ${category} sector with ${count} projects is showing reduced growth compared to other categories.`;
    }
  }
  
  private async simulateProcessingDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Export a singleton instance
export const aiService = new AIService();
