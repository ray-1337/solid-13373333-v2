import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createHtmlPlugin } from 'vite-plugin-html';
import dotenv from "dotenv";
import autoprefixer from "autoprefixer";
import { generateString } from './src/Util';

const env = dotenv.config({path: process.cwd() + "/.env"});

const oneTimeRenderCode = generateString(12);

// content security policy
const precollectedCSP = {
  "img-src": ["'self'", "https://13373333.one/favicon.webp"],
  "default-src": ["'self'"],
  "script-src": ["'self'"],
  "frame-src": ["'self'", "https://www.youtube-nocookie.com/embed/", "https://youtube-nocookie.com/embed/"],
  "connect-src": ["'self'", "https://13373333.one/3333/file/"],
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
};

const combinedCSP = Object.entries(precollectedCSP).map(([directive, sources]) => `${directive} ${sources.join(' ')};`).join(' ');

export default defineConfig({
  plugins: [
    solidPlugin(),

    createHtmlPlugin({
      minify: false,
      template: "/index.html",
      inject: {
        data: {
          "cssPreviewDevOnly": process.env.npm_lifecycle_event == "dev" ? `<link href="./src/css/Preview.css" rel="preload stylesheet" as="style"/>` : "",
        }
      }
    })
  ],
  
  build: {
    assetsInlineLimit: 1024,
    cssCodeSplit: false,
    minify: true,
    target: 'esnext',
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return `itchi/${oneTimeRenderCode}/[hash][extname]`;
        },

        chunkFileNames: () => {
          return `itchi/${oneTimeRenderCode}/[hash].js`;
        },

        entryFileNames: () => {
          return `itchi/${oneTimeRenderCode}/[hash].js`;
        }
      }
    }
  },

  preview: {
    port: Number(env.parsed?.["PORT"] || 5173),
    headers: {
      "content-security-policy": combinedCSP
    }
  },

  server: {
    port: Number(env.parsed?.["DEVPORT"] || 5172),
    headers: {
      "content-security-policy": combinedCSP
    }
  },

  css: {
    postcss: {
      plugins: process.env.npm_lifecycle_event == "dev" ? [] : [ autoprefixer({ supports: true }) ],
    }
  }
});