/** @type {import('next').NextConfig} */

// Automatically detect if we're running in GitHub Actions
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

// Determine basePath dynamically:
// - On GitHub Pages (project site): use /<repo>
// - On local/dev or user site (username.github.io): no basePath
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isCI && repo ? `/${repo}` : '');

const nextConfig = {
  // Required for static export
  output: 'export',

  // Ensure URLs have trailing slashes for proper static routing
  trailingSlash: true,

  // Disable server-side image optimization (needed for static hosting)
  images: { unoptimized: true },

  // Apply basePath & assetPrefix only when necessary
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // Optional: enable strict mode and React 18 concurrent features
  reactStrictMode: true,
};

export default nextConfig;
