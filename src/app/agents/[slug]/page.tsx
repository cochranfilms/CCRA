import { loadAgents, loadListings, getListingsByAgent } from '@/lib/data';
import { Section, Split } from '@/components/ui/section';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

// Disable static params to avoid build-time external API calls via iHomefinder
export const dynamic = 'force-dynamic';

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const [agents, listings] = await Promise.all([loadAgents(), loadListings()]);
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return <div className="container-wide section">Agent not found.</div>;
  const agentListings = getListingsByAgent(listings, agent.id);
  const FALLBACK = 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop';

  return (
    <Section>
      <div className="container-wide">
        <Split
          left={(
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-[var(--muted)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(agent.photo && !agent.photo.endsWith('.svg')) ? agent.photo : FALLBACK} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{agent.name}</h1>
                <div className="opacity-80">{agent.title} · {agent.office}</div>
                <div className="mt-3 flex gap-3">
                  <a href={`tel:${agent.phone}`} className="btn-primary">Call</a>
                  <a href={`mailto:${agent.email}`} className="btn-outline">Email</a>
                </div>
              </div>
            </div>
          )}
          right={(
            <div>
              <h2 className="font-medium mb-2">About</h2>
              <p className="opacity-90">{agent.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full border">{s}</span>
                ))}
              </div>
            </div>
          )}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Listings</h2>
          {agentListings.length === 0 ? (
            <div className="opacity-70">No active listings.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentListings.map((l) => (
                <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
                  <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.photos[0]} alt={l.address} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                  </div>
                  <div className="p-4">
                    <div className="font-medium">${'{'}(l.price).toLocaleString(){'}'}</div>
                    <div className="text-sm opacity-80">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
                    <div className="text-sm mt-1">{l.address}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}


