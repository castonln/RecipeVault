import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: (mode === 'ELECTRON' || process.env.ELECTRON) ? './' : '/',   // electron file path shenanagains
  plugins: [react()],
}));
