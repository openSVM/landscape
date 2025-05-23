interface ProjectType {
  id?: string;
  name: string;
  category: string;
  subcategory: string;
  description?: string;
  logo?: string;
  website?: string;
  github?: string;
  twitter?: string;
  telegram?: string;
  tags?: string[];
  metrics?: {
    tvl?: number;
    users?: number;
    transactions?: number;
  };
}

interface CategoryType {
  name: string;
  count: number;
  subcategories: {
    name: string;
    count: number;
  }[];
}

export type { ProjectType, CategoryType };
