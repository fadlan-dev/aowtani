/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      { hostname: 'api.budu.triple-i.in' },
    ],
  },
};

module.exports = nextConfig;
