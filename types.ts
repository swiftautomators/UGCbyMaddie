
export enum FunnelStage {
  AWARENESS = 'Awareness',
  CONSIDERATION = 'Consideration',
  TRANSACTION = 'Transaction'
}

export interface PortfolioItem {
  id: string;
  title: string;
  stage: FunnelStage;
  videoUrl: string;
  thumbnail: string;
  results?: string;
}

export interface SubmissionData {
  name: string;
  email: string;
  brandName: string;
  budget: string;
  goal: string;
  message: string;
}

export interface ServicePackage {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}
