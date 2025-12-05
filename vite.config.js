import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // <--- ESTO ES LO QUE FALTABA
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})