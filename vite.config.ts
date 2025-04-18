import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: Number(process.env.PORT) || 4173,
    host: true,
    allowedHosts: ['candidate-search-aa5x.onrender.com', '.onrender.com']
  }
});