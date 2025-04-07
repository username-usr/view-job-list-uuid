import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ensures proper routing
  build: {
    outDir: 'dist', // Vercel expects this by default for Vite
  },
})
