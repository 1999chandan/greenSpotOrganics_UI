import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/greenSpotOrganics_UI/' : '/',
  build: {
    outDir: 'build',
  },
  plugins: [react(),
tailwindcss(),
  ],
})
