import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === 'true' || process.env.VERCEL_ENV === 'preview';
  if (isStaging) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}


