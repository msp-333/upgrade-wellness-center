// next.config.mjs
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // e.g. "/upgrade-wellness-center"

const nextConfig = {
  output: 'export',          // required for static export
  trailingSlash: true,       // ensures /path/index.html
  images: { unoptimized: true },

  // Only set when non-empty (GitHub Pages subpath)
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`, // critical for loading /_next assets on Pages
  }),
};

export default nextConfig;
