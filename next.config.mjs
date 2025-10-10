// next.config.mjs

// Detect GitHub Actions (for automatic basePath when building in CI)
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || // e.g. "/upgrade-wellness-center" for GitHub Pages
  (isCI && repo ? `/${repo}` : '');    // fallback when building in GitHub Actions

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Better compatibility with static hosting
  trailingSlash: true,

  // Disable server image optimization (required for static export)
  images: { unoptimized: true },

  reactStrictMode: true,

  // Apply basePath & assetPrefix only when non-empty
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`, // IMPORTANT: trailing slash
  }),
};

export default nextConfig;
