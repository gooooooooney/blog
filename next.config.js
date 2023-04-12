/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  // output: 'export',
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/secure.notion-static.com/**',
      },
    ],
  },
  
}

module.exports = nextConfig
