const repo = 'upgrade-wellness-center'
const isProd = process.env.NODE_ENV === 'production'
export default {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : undefined,
}
