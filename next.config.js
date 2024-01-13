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
        ],
      },
}

module.exports = nextConfig
