import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'local.park.me.gbolf.com',
    port: 3000,
    https: {
      key: fs.readFileSync('certs/key.pem'),
      cert: fs.readFileSync('certs/cert.pem'),
    },
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, '/src/assets/images'),
      '@router': path.resolve(__dirname, '/src/components/Router.tsx'),
      '@contexts': path.resolve(__dirname, '/src/contexts'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@common': path.resolve(__dirname, '/src/common'),
      '@hooks': path.resolve(__dirname, '/src/hooks'),
    },
  },
});
