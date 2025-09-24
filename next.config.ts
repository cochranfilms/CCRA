import type { NextConfig } from "next";

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === 'true';

const nextConfig: NextConfig = {
  async redirects() {
    if (!isMaintenance) return [];
    return [
      {
        // Exempt next assets, API, maintenance paths, and any file with an extension
        source: '/((?!_next|maintenance|favicon.ico|robots.txt|sitemap.xml|api).*)(?<!\\.[a-zA-Z0-9]{2,4})',
        destination: '/maintenance',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
