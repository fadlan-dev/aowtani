/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'api.aowtani.com' }],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_API_HOST: process.env.NEXT_API_HOST,
    NEXT_IMAGE_HOST: process.env.NEXT_IMAGE_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
