const isProduction = process.env.NODE_ENV === 'production'

const prefix = isProduction? "https://lemondouble.github.io/arca-con-mirror/" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'imgix',
    path: prefix,
  },
  assetPrefix: prefix

}

module.exports = nextConfig