import { Agent, Community, Listing } from '@/types/data';
import agentsJson from '../../content/agents.json';
import communitiesJson from '../../content/communities.json';
import listingsJson from '../../content/listings.json';

export async function loadAgents(): Promise<Agent[]> {
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


