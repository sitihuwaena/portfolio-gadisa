/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'strapi.choirulaffan.dev',
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
}

module.exports = nextConfig
