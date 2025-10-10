// next.config.mjs

// Detect when we're in CI (GitHub Actions sets both of these)
const isCI = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';
// Try to infer the repo name for GitHub Pages (owner/repo)
const repoFromActions = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

const basePath =
  // Manual override (what your build:pages script uses for GH Pages)
  process.env.NEXT_PUBLIC_BASE_PATH
  // Auto when running in GitHub Actions (e.g., "/upgrade-wellness-center")
  || (isCI && repoFromActions ? `/${repoFromActions}` : '')
  // Local dev defaults to empty (no basePath)
;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for GitHub Pages (static hosting)
  output: 'export',

  // Keep URLs consistent for static hosting
  trailingSlash: true,

  // Required when exporting statically
  images: { unoptimized: true },

  reactStrictMode: true,

  // Apply only when basePath is non-empty
  ...(basePath && {
    basePath,
    // IMPORTANT: trailing slash so Next loads assets from "/<repo>/_next/..."
    assetPrefix: `${basePath}/`,
  }),

  // Optional: avoid builds failing on lint in CI exports
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
