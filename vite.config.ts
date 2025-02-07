import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      // 修正這裡，不要讓 "/api" 被加兩次
      '/api': {
        target: 'https://your-api-endpoint.com', // API 伺服器
        changeOrigin: true, // 避免 CORS 問題
        secure: false, // 如果 API 使用 HTTPS，但沒有 SSL 憑證，設為 false
        rewrite: path => path.replace(/^\/api/, ''), // 移除 "/api"，讓請求正確轉發
      },
    },
  },
});
