/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Only apply when set, otherwise Next treats empty string as root
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
