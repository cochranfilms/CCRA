import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/data';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();
  return (
    <main>
      <section className="section">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold">{post.title}</h1>
          <div className="mt-2 text-sm text-white/70">By {post.author}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt="" className="mt-6 w-full max-h-[420px] object-cover" />
          <article className="prose prose-invert mt-6 max-w-none">
            <p>{post.content}</p>
            <p>
              This is placeholder content to visualize a full article. You can replace this with real
              CMS-powered content later. Add headings, images, and quotes to match your brand.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}


