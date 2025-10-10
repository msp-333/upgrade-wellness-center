// next.config.mjs
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isCI && repo ? `/${repo}` : '');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,

  // ✅ Apply only when non-empty
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`,   // <— note the trailing slash
  }),
};

export default nextConfig;
