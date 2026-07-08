import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable CSS minification
    cssMinify: true,
    // Optimize chunk splitting via function (required by Vite 8 / Rolldown)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('react-activity-calendar')) {
            return 'activity-calendar';
          }
        },
      },
    },
  },
})
