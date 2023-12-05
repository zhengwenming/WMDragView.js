import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //端口
  server: {
    port: 3000,
    //是否自动打开浏览器
    open: true,
    host: '0.0.0.0',
    //是否开启 https
    // https: false,
    //是否开启代理
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
