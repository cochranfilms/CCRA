import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const urls = ['/', '/agents', '/find-an-agent', '/communities', '/book'];
  return urls.map((path) => ({ url: `${base}${path}`, changeFrequency: 'weekly', priority: path === '/' ? 1 : 0.6 }));
}


