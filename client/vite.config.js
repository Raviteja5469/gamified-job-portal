import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://jobquest-backend-1-3l3w.onrender.com', // Proxy API requests to backend
    },
  },
});