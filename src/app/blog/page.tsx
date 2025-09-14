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
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl">Blog</h1>
          <p className="mt-2 text-white/80 md:text-lg">Daily curated market insights from trusted 2025 real estate sources.</p>

          <h2 className="mt-8 text-2xl font-semibold">Latest from around real estate</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {external.map((post) => (
              <article key={post.id} className="card border border-[var(--muted)]/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover!} alt="" className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-sm text-white/80 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-3 text-xs text-white/60 flex items-center gap-2">
                    <span>{post.source}</span>
                    {post.date && <span>• {new Date(post.date).toLocaleDateString()}</span>}
                  </div>
                  <a href={post.url} target="_blank" rel="noreferrer" className="mt-4 inline-block btn-outline">Read at source</a>
                </div>
              </article>
            ))}
          </div>

          {/* Removed internal section per request. Only external sources are shown. */}
        </div>
      </section>
    </main>
  );
}


