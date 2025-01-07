import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // input: '/src/main.jsx', // 指定 JS 入口文件
      input: './index.html', // 指定 JS 入口文件
    },
  },
});
