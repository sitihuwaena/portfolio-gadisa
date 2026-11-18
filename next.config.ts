import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.choirulaffan.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  // Disable source maps in development to avoid sourcemap errors
  productionBrowserSourceMaps: false,
};

export default nextConfig;
