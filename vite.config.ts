import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vuePlugin from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  define: {
    global: 'window',
    
  },
  server: {
    port: 8888,
    strictPort: true
  },
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
