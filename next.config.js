const { cdnURL } = require("./config");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",

  compress: isProd,
  
  assetPrefix: isProd ? cdnURL : undefined,

  poweredByHeader: false,

  images: {
    loader: isProd ? "custom" : "default",
    domains: isProd ? ["itchi.cdn.13373333.one"] : undefined,
    unoptimized: isProd ? undefined : true
  },

  transpilePackages: ['@tabler/icons-react'],

  experimental: {
    optimizePackageImports: ["simple-icons", "@tabler/icons-react"]
  },
}

module.exports = nextConfig;