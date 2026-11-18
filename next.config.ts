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
  async rewrites() {
    // Proxy browser API calls through the website itself so Strapi's
    // CORS allow-list is not involved (the browser only talks to the
    // same origin). The Strapi address comes from the environment.
    const apiUrl =
      process.env.NEXT_PUBLIC_RELEASE_STAGE === 'production'
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    return [
      {
        source: '/strapi-api/:path*',
        destination: `${apiUrl || 'https://strapi.gadisamaulidiah.my.id'}/:path*`,
      },
    ]
  },
};

export default nextConfig;
