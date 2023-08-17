const nextSafe = require("next-safe");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  images: {
    unoptimized: true
  },

  transpilePackages: ['@tabler/icons-react'],
  
  modularizeImports: {
    "@tabler/icons-react": {
      transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
    },
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({
          isDev: process.env.NODE_ENV !== 'production',

          contentSecurityPolicy: {
            "img-src": ["'self'"],
            "default-src": ["'self'"],
            "script-src": ["'self'"],
            "frame-src": ["'self'", "https://www.youtube-nocookie.com/embed/"],
            "connect-src": ["'self'"],
            "font-src": [
              "'self'",
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
              "https://fonts.gstatic.com/s/",
            ],
            "style-src": [
              "'self'", "'unsafe-inline'",
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
              "https://fonts.googleapis.com/"
            ]
          },

          permissionsPolicy: false
        })
      },
    ]
  }
}

module.exports = nextConfig;