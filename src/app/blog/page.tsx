import { getDailyCachedPosts } from '@/lib/blogAggregator';

export const revalidate = 86400; // Rebuild this page at most once per day

export const metadata = {
  title: 'Blog | Cross Creek Realty',
  description: 'Market insights, buying and selling tips, and local stories.',
};

export default async function BlogPage() {
  const external = await getDailyCachedPosts(36);
  return (
    <main>
      {/* Hero (video background + title card) */}
      <section className="relative h-[44vh] md:h-[60vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Interior_real_estate.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        <div className="relative container-wide h-full flex items-center">
          <div className="max-w-5xl text-white">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">Market Insights</div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Insights & <span className="text-amber-400">Stories</span></h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">Daily curated market insights from trusted real estate sources across the industry.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold text-[color:var(--brand-deep)]">Latest from around real estate</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {external.map((post) => (
              <article key={post.id} className="relative group border border-[var(--muted)]/50 bg-white overflow-hidden shadow-premium hover-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover!} alt="" className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                <div className="p-5">
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[color:var(--muted)] text-slate-700">{post.source}</span>
                    {post.date && <span className="text-slate-500">{new Date(post.date).toLocaleDateString()}</span>}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold line-clamp-2 text-[color:var(--brand-deep)]">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                  <a href={post.url} target="_blank" rel="noreferrer" className="mt-4 inline-block btn-outline">Read at source</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


