/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'strapi.gadisamaulidiah.my.id',
            port: '',
            pathname: '/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'strapi-dev.gadisamaulidiah.my.id',
            port: '',
            pathname: '/uploads/**',
          },
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '1337',
            pathname: '/uploads/**',
          }
        ],
      },
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
}

module.exports = nextConfig
