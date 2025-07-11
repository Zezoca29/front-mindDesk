import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Bind to 0.0.0.0 for production
    port: process.env.PORT || 5173, // Use PORT from environment or default to 5173
    proxy: {
      '/api': {
        target: 'https://221549b67d8a.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      }
    }
  },
  preview: {
    host: true,
    port: process.env.PORT || 5173
  }
})
