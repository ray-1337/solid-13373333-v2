const { cdnURL, cupcakkeVaginaLyrics } = require("./config");
const { relative } = require("node:path");

const isProd = process.env.NODE_ENV === "production";

let CACHE_CSS_INDEXES = 0;
let CACHE_MAP = {};

const wrappedLyrics = [...new Set(cupcakkeVaginaLyrics.toLowerCase().replace(/[^\w\d\s]/gim, "").split(/\s/gim).filter(x => x.length >= 1))];

let lyricsInOrder = (context, _, localName) => {
  const filepath = relative(context.rootContext, context.resourcePath);
  const key = filepath + localName;

  const cached = CACHE_MAP[key];
  if (cached) return cached;

  const result = wrappedLyrics[CACHE_CSS_INDEXES];

  CACHE_CSS_INDEXES++;
  CACHE_MAP[key] = result;

  return result;
};

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

  webpack: (config) => {
    let rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (moduleLoader.loader?.includes('css-loader') && !moduleLoader.loader?.includes('postcss-loader')) {
          moduleLoader.options.modules.getLocalIdent = lyricsInOrder;
        };
      });
    });
    
    return config;
  }
}

module.exports = nextConfig;