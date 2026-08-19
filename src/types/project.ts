/**
 * Core type definitions for Portfolio Projects, Experiments & Tech Stack
 */

export type ProjectStatus = 'in-development' | 'production' | 'concept' | 'archived';

export type TechCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'Fullstack' 
  | 'Design' 
  | 'Motion / Video' 
  | 'Architecture' 
  | 'Creative Tech'
  | 'Language'
  | 'Runtime'
  | 'Styling'
  | 'Graphics'
  | 'Vectors'
  | 'Video'
  | 'Color'
  | 'VCS'
  | string;

export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'figma' | 'demo' | string;
}

/**
 * Tech Stack Item Interface
 */
export interface TechStackItem {
  id: string;
  name: string;
  category: TechCategory;
  color?: string; // Brand color hex
  iconKey?: string;
  proficiency?: 'fresher' | 'intermediate' | 'advanced';
  featuredInCarousel?: boolean;
}

/**
 * Major Case Study / Selected Work Item
 */
export interface WorkProject {
  id: string;
  slug: string;
  title: string;
  company?: string;
  kind?: 'website' | 'mobile-app' | 'brand-design' | string;
  tagline: string;
  role: string;
  year: string;
  timeline: string;
  status: ProjectStatus;
  category: TechCategory;
  summary: string;
  detailedParagraphs?: string[];
  problemStatement?: string;
  solution?: string;
  deliverables: string[];
  stack: string[];
  designTools?: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  coverImage?: string;
  altText?: string;
  galleryImages?: string[];
  featured: boolean;
}

/**
 * Lab Experiment / Prototype Item
 */
export interface ExperimentProject {
  id: string;
  title: string;
  company?: string;
  kind?: 'website' | 'mobile-app' | 'brand-design' | string;
  date: string; // MM / YYYY
  tag: string;
  category: TechCategory;
  description: string;
  technologies: string[];
  image?: string;
  altText?: string;
  previewUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  featured: boolean;
}

export interface PortfolioData {
  developer: {
    name: string;
    role: string;
    level: string;
    location: string;
    bio: string;
    codeStack: string[];
    designStack: string[];
  };
  techStack: TechStackItem[];
  works: WorkProject[];
  experiments: ExperimentProject[];
}
