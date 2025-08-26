import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';

export const metadata = {
  title: 'Blog | Cross Creek Realty',
  description: 'Market insights, buying and selling tips, and local stories.',
};

export default function BlogPage() {
  return (
    <main>
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl">Blog</h1>
          <p className="mt-2 text-white/80 md:text-lg">Market insights, tips, and local stories.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card border border-[var(--muted)]/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover} alt="" className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>
                  <p className="mt-2 text-sm text-white/80 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-3 text-xs text-white/60">By {post.author}</div>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-block btn-outline">Read more</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


