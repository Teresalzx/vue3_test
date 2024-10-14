// 引入路由
import router from '@/router/index'
// 引入Element-Plus/icon组件
import  ElementPlus  from 'element-plus'
import 'element-plus/dist/index.css'

// 引入模板的全局样式
import './styles/index.scss'

// 配置国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from './store/index'

import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入路由鉴权
import  './permission.ts'


import { createApp } from 'vue'
import App from '@/App.vue'

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus,{
  locale:zhCn
});
app.use(router)
app.use(pinia)

// icon注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
