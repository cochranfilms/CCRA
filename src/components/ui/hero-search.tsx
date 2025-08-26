"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [mode, setMode] = useState<'Buy' | 'Rent' | 'Sell'>('Buy');
  const [query, setQuery] = useState('');
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (mode !== 'Buy') params.set('mode', mode);
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <div className="card p-4 md:p-6 bg-white/95 text-[var(--foreground)] rounded-none">
      <div className="flex gap-2 mb-3">
        {(['Buy','Rent','Sell'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded-none border ${mode===m ? 'bg-[var(--brand-deep)] text-white' : ''}`}>{m}</button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 p-3 rounded-none bg-transparent border text-[var(--foreground)]"
          placeholder="City, Neighborhood, Address, School, ZIP, Agent, MLS #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-primary">Search</button>
      </form>
    </div>
  );
}


