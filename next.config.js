const nextSafe = require("next-safe");
const { cdnDomain, cdnURL } = require("./config");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  
  assetPrefix: process.env.NODE_ENV === "production" ? cdnURL : undefined,

  poweredByHeader: false,

  images: {
    loader: "custom",
    domains: ["itchi.cdn.13373333.one"]
  },

  transpilePackages: ['@tabler/icons-react'],
  
  modularizeImports: {
    "@tabler/icons-react": {
      transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
    },

    "simple-icons": {
      transform: "simple-icons/icons",
      preventFullImport: true,
      skipDefaultConversion: true
    }
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({
          isDev: !isProd,

          contentSecurityPolicy: {
            "prefetch-src": false,
            "img-src": ["'self'", cdnURL],
            "default-src": ["'self'", cdnURL],
            "script-src": ["'self'", "https://static.cloudflareinsights.com/beacon.min.js/", cdnURL],
            "frame-src": ["'self'", cdnURL],
            "connect-src": ["'self'", `wss://${cdnDomain}`, cdnURL],
            "font-src": [
              "'self'",
              "https://fonts.gstatic.com/s/",
            ],
            "style-src": [
              "'self'", "'unsafe-inline'",
              "https://fonts.googleapis.com/",
              cdnURL
            ]
          },

          permissionsPolicy: false
        })
      },
    ]
  }
}

module.exports = nextConfig;