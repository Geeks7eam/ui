/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@zyxui/button',
    '@zyxui/alert',
    '@zyxui/accordion',
    '@zyxui/text',
    '@zyxui/lib',
    '@zyxui/config',
    '@zyxui/theme',
  ],
};

module.exports = nextConfig;
