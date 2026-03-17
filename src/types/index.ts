export interface Tool {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  platform: Platform;
  icon: string;
  color: string;
  placeholder: string;
  faqs: FAQ[];
  steps: Step[];
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'facebook';

export interface SEOPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  toolSlug: string;
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  relatedTools: string[];
  faqs: FAQ[];
  sections: BlogSection[];
}

export interface BlogSection {
  heading: string;
  content: string;
}

export interface DownloadResult {
  success: boolean;
  platform: Platform | null;
  title?: string;
  thumbnail?: string;
  duration?: string;
  qualities?: Quality[];
  error?: string;
}

export interface Quality {
  label: string;
  format: string;
  size?: string;
  url: string;
  directUrl?: boolean; // true = link directly (skip proxy), e.g. IP-locked YouTube URLs
}
