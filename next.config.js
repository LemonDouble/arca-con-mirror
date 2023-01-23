const isProduction = process.env.NODE_ENV === 'production'

const prefix = isProduction? "https://lemondouble.github.io/arca-con-mirror/" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains : ['dqbobx5h4f3nm.cloudfront.net']
  },
  assetPrefix: prefix

}

module.exports = nextConfig