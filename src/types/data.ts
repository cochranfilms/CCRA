export interface Listing {
  id: string;
  slug: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  beds: number;
  baths: number | string;
  sqft: number;
  photos: string[];
  communitySlug: string;
  agentIds: string[];
  features: string[];
  status: 'active' | 'pending' | 'sold';
}

export interface AgentSocialLinks {
  [key: string]: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  languages: string[];
  specialties: string[];
  office: string;
  bio: string;
  social?: AgentSocialLinks;
  serviceAreas: string[];
}

export interface CommunityStats {
  medianPrice: number;
  dom: number;
}

export interface Community {
  slug: string;
  name: string;
  heroImage: string;
  center: { lat: number; lng: number };
  description: string;
  stats: CommunityStats;
  highlights: string[];
  tags: string[];
}


