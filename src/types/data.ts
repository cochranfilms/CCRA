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


// ---- Lead/CRM types ----
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string | null;
  landing_page?: string;
}

export interface PropertyContext {
  listingId?: string;
  listingSlug?: string;
  address?: string;
  price?: number;
  beds?: number;
  baths?: number | string;
  sqft?: number;
  lat?: number;
  lng?: number;
  communitySlug?: string;
}

export type LeadRole = 'Buyer' | 'Seller' | 'Renter' | 'Agent' | 'General';

export interface LeadPayloadBase {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  role?: LeadRole;
  consent?: boolean;
  source?: string; // component/page name
  utm?: UTMParams;
  property?: PropertyContext;
  meta?: Record<string, unknown>;
}

export interface ShowingRequest extends LeadPayloadBase {
  preferredDate?: string;
}

export type LeadPayload = LeadPayloadBase | ShowingRequest;

