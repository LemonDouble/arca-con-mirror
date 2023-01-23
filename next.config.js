/** @type {import('next').NextConfig} */

// https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/
const isGithubActions = process.env.GITHUB_ACTIONS || false
let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
