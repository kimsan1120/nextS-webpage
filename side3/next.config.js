/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
 
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'themewagon.github.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.kenyaadultblog.com' },
    ],
  },
};
