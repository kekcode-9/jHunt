import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/background/background.js', // Source path
          dest: 'background', // Destination folder inside dist
        },
        // {
        //   src: 'src/main.js',
        //   dest: ''
        // },
        {
          src: 'index.html',
          dest: ''
        }
      ],
    }),
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        content: 'src/main.js', // Build `main.js` as the content script
      },
      output: {
        entryFileNames: 'main.js',
      },
      commonjsOptions: {
        include: [/node_modules/], // Include dependencies in the bundle
        format: 'iife',
      },
      external: []
    },
  },
})
