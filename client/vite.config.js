console.log('Vite config loaded with proxy target: https://recipevault-server.onrender.com');

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
