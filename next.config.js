/** @type {import('next').NextConfig} */

// https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/
const production = process.env.NODE_ENV === "production";
let assetPrefix = ''
let basePath = '/'

if (production) {
  const repo = "arca-con-mirror"

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  reactStrictMode: true,

  images: {
    unoptimized: true,
    loader: "custom"
  },
}

module.exports = nextConfig
