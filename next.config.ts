import type { NextConfig } from "next";

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === 'true';

const nextConfig: NextConfig = {
  async redirects() {
    if (!isMaintenance) return [];
    return [
      {
        source: '/((?!_next|maintenance|favicon.ico|robots.txt|sitemap.xml|api).*)',
        destination: '/maintenance',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
