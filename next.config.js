/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'api.aowtani.com' }],
  },
  env: {
    NEXT_PUBLIC_URL: 'https://api.aowtani.com',
    NEXT_API_HOST: 'https://api.aowtani.com/kronos',
    NEXT_IMAGE_HOST: 'https://api.aowtani.com',
    NEXTAUTH_SECRET: 'my_ultra_secure_nextauth_secret',
    NEXTAUTH_URL: 'https://aowtani.com',
  },
};

module.exports = nextConfig;
