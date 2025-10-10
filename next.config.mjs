// next.config.mjs
const isCI = !!process.env.GITHUB_ACTIONS;
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];

/** If NEXT_PUBLIC_BASE_PATH is set, we use it.
 *  Otherwise, on CI we fall back to "/<repo>" (safe for GitHub Pages). */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isCI && repo ? `/${repo}` : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`, // note the trailing slash
  }),
};

export default nextConfig;
