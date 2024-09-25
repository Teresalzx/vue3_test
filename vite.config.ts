import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import {resolve} from "path"


import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig(({command,mode})=>{
  // 获取各个环境下对应的变量
  return {
    plugins: [vue(),
      
      vueSetupExtend(),
    ],
    resolve: {
      alias: {
          "@": resolve(__dirname,"src") // 相对路径别名配置，使用 @ 代替 src
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


    server:{
      host:'0.0.0.0',
      port:80,
    }
  }
})
