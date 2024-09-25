
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
// import {resolve} from "path"


import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'src')
    }
  },
  // scss全局变量配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  // 代理跨域
  server:{
    host:'0.0.0.0',
    port:80
  },
  
})
