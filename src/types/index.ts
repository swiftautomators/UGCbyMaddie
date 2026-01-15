export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  stats: string;
  link: string;
}

export interface SubmissionData {
  email: string;
  project_type: 'TikTok Shop' | 'Paid Ads' | 'Organic Growth';
  budget_tier: '$1500-$3000' | '$3000-$5000' | '>$5000';
  details: Record<string, any>;
}

export interface ServicePackage {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}
