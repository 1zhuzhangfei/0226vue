import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        rewrite:(path) => path.replace(/^\/api/,"")
      }
    }
  },

})
