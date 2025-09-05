import { Agent, Community, Listing } from '@/types/data';
import { fetchIHFAgents } from '@/lib/ihf';
import agentsJson from '../../content/agents.json';
import communitiesJson from '../../content/communities.json';
import listingsJson from '../../content/listings.json';

export async function loadAgents(): Promise<Agent[]> {
  try {
    const agents = await fetchIHFAgents();
    if (agents.length) return agents;
  } catch {}
  return (agentsJson as unknown) as Agent[];
}

export async function loadCommunities(): Promise<Community[]> {
  return (communitiesJson as unknown) as Community[];
}

export async function loadListings(): Promise<Listing[]> {
  return (listingsJson as unknown) as Listing[];
}

export function findAgentBySlug(agents: Agent[], slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getListingsByCommunity(listings: Listing[], communitySlug: string): Listing[] {
  return listings.filter((l) => l.communitySlug === communitySlug);
}

export function getListingsByAgent(listings: Listing[], agentId: string): Listing[] {
  return listings.filter((l) => l.agentIds.includes(agentId));
}


// ----- Blog demo data -----
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string; // ISO string
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'spring-market-update',
    title: 'Spring Market Update: What Buyers Should Know',
    excerpt: 'Rates, inventory, and strategies for winning in a competitive spring season.',
    cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    author: 'Cross Creek Realty Team',
    date: new Date().toISOString(),
    content:
      'The spring housing market is heating up. In this update, we cover pricing trends, mortgage rates, and how to prepare a winning offer. Staging, pre-approval, and timing remain key factors for buyers who want to move decisively.',
  },
  {
    slug: 'selling-for-top-dollar',
    title: 'Selling for Top Dollar: 7 Proven Tips',
    excerpt: 'From curb appeal to pricing strategy—how to maximize your sale.',
    cover: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a69?q=80&w=1600&auto=format&fit=crop',
    author: 'Cross Creek Realty Team',
    date: new Date().toISOString(),
    content:
      'Small improvements can have an outsized impact. We walk through decluttering, light updates, professional photos, and timing your launch to generate multiple offers in the first week on market.',
  },
  {
    slug: 'neighborhood-spotlight',
    title: 'Neighborhood Spotlight: Midtown Living',
    excerpt: 'Walkable streets, food, arts, and parks—why Midtown is in demand.',
    cover: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop',
    author: 'Cross Creek Realty Team',
    date: new Date().toISOString(),
    content:
      'Midtown blends culture and convenience. Explore housing styles, commute options, and weekend favorites to see why more buyers are putting Midtown at the top of their list.',
  },
];

