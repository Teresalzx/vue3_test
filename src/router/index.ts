import { createRouter,createWebHistory } from "vue-router";
import { constRoutes } from "./routes";
const router = createRouter({
  // 路由模式:history
  history:createWebHistory(),
  routes:constRoutes
})

export default router