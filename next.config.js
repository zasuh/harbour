/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts');
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = withFonts(nextConfig);
