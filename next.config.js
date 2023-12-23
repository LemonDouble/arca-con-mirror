/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const prefix = isProduction? "https://lemondouble.github.io/arca-con-mirror/" : ""

const nextConfig = {
    output : "export",
    images : {
        unoptimized : true
    },
    assetPrefix: prefix
}

module.exports = nextConfig
