export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  number: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  targetAudience: string;
  image: string;
  fee?: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  credentials: string;
  expertise: string[];
  bio: string;
  image: string;
  isFounder?: boolean;
  availableForConsultation: boolean;
}

export interface ResourceArticle {
  id: string;
  number: string;
  title: string;
  category: 'Education' | 'Family Support' | 'Recovery' | 'Substance Use' | 'Mental Wellbeing' | 'Announcements';
  readTime: string;
  description: string;
  content: string[];
  publishedDate: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Consultation' | 'Families' | 'Privacy' | 'Payment';
}

export interface ChallengeCampaign {
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'X (Twitter)';
  tagline: string;
  description: string;
  howToParticipate: string[];
  rules: string[];
  prizes?: string;
  hashtag: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  consultationFee: string;
  currency: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  whatsappPlaceholder: string;
  addressPlaceholder: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string;
    whatsapp: string;
  };
}
