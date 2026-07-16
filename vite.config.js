import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Techi Champs — multi-page site.
// Each page is a real HTML entry with its own URL.
export default defineConfig({
  base: './',
  server: { open: true, port: 5173 },
  build: {
    outDir: 'dist',
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        work: resolve(__dirname, 'work.html'),
        process: resolve(__dirname, 'process.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
