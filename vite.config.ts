import { defineConfig } from 'vite';

import solidPlugin from 'vite-plugin-solid';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCSP from "vite-plugin-csp";
import dotenv from "dotenv";
import autoprefixer from "autoprefixer";
import { generateString } from './src/Util';

const env = dotenv.config({path: process.cwd() + "/.env"});

const oneTimeRenderCode = generateString(12);

// @ts-expect-error
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
    }),

    viteCSP({
      policy: {
        "img-src": ['self'],
        "default-src": "self",
        "script-src": "self",
        "frame-src": ["none"],
        "connect-src": ["self"],
        "font-src": [
          "self",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
          "https://fonts.gstatic.com/s/",
        ],
        "style-src": [
          "self", "unsafe-inline",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/",
          "https://fonts.googleapis.com/"
        ]
      }
    })
  ],
  
  build: {
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
    port: Number(env.parsed?.["PORT"] || 5173)
  },

  server: {
    port: Number(env.parsed?.["DEVPORT"] || 5172)
  },

  css: {
    postcss: {
      plugins: process.env.npm_lifecycle_event == "dev" ? [] : [ autoprefixer({ supports: true }) ],
    }
  }
});