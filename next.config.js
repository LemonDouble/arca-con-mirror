/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  assetPrefix: isProd ? '/your-github-repo-name/' : '',
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
