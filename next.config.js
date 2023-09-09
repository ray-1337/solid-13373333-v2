const nextSafe = require("next-safe");
const { cdnDomain, cdnURL } = require("./config");

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
          isDev: process.env.NODE_ENV !== 'production',

          contentSecurityPolicy: {
            "prefetch-src": false,
            "img-src": ["'self'", cdnURL],
            "default-src": ["'self'", cdnURL],
            "script-src": ["'self'", "https://static.cloudflareinsights.com/beacon.min.js/", cdnURL],
            "frame-src": ["'self'", "https://www.youtube-nocookie.com/embed/", cdnURL],
            "connect-src": ["'self'", `wss://${cdnDomain}`, cdnURL],
            "font-src": [
              "'self'",
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
              "https://fonts.gstatic.com/s/",
            ],
            "style-src": [
              "'self'", "'unsafe-inline'",
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
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