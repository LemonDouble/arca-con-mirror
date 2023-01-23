const isGithubActions = process.env.GITHUB_ACTIONS || false

let basePath = ''

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  basePath = `/${repo}`
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
}

module.exports = nextConfig