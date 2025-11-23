import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to resolve "Property 'cwd' does not exist on type 'Process'" TypeScript error
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    // PENTING: Ganti 'nama-repository-anda' dengan nama repo GitHub Anda.
    // Jika nama repo Anda 'portfolio-game', maka ubah menjadi '/portfolio-game/'
    // Jika deploy ke user.github.io (root), biarkan '/'
    base: '/nama-repository-anda/', 
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})