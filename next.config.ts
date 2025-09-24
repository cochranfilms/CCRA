import type { NextConfig } from "next";

const isMaintenance = process.env.MAINTENANCE_MODE === 'true' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

const nextConfig: NextConfig = {
  async redirects() {
    if (!isMaintenance) return [];
    return [
      {
        // Only redirect HTML page requests (so assets like /logo.webp are not affected)
        source: '/:path((?!_next/|api/|maintenance|favicon.ico|robots.txt|sitemap.xml).*)',
        has: [{ type: 'header', key: 'accept', value: 'text/html' }],
        destination: '/maintenance',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
