import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Dev server runs on port 3000 (the backend allows this address via CORS)
export default defineConfig({
  plugins: [vue()],
  server: { port: 3000 }
});
