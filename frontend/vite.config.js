import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 🚨 THIS 'esbuild' BLOCK MUST BE PERFECTLY STRUCTURED
  esbuild: {
    // The 'loader' key must contain an object of mappings
    loader: 'jsx', // The value 'jsx' is a string
   
    // NO EXTRA CURLY BRACES OR UNNECESSARY KEYS HERE
  },
})