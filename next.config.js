/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      { hostname: process.env.NEXT_IMAGE_HOST },
    ],
  },
};

module.exports = nextConfig;
