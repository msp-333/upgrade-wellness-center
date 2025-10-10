// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,

  // 👇 This is the key bit for GitHub Pages
  basePath: '/upgrade-wellness-center',
  assetPrefix: '/upgrade-wellness-center/', // note trailing slash
};

export default nextConfig;
