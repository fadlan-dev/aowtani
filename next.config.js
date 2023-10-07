/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'api.aowtani.com' }],
  },
};

module.exports = nextConfig;
