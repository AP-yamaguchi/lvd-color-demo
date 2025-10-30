import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesでデプロイする場合は、base を設定してください
  // 例: base: '/color-app-sample/',
  base: './',
})
