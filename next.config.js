/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/arca-con-mirror' : '',
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
