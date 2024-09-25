<template>
    <el-button icon="Refresh" circle  @click="handleRefresh"></el-button>
      <el-button icon="FullScreen" circle  @click="fullScreen"></el-button>
      <el-button icon="Setting" circle></el-button>
      <img :src=" userStore.avatar " alt="" style="border-radius: 50%;">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- {{ userStore.username }} -->
            admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
</template>
  
<script setup lang='ts' name="Setting">
  import { useRouter,useRoute } from 'vue-router';
  import useUserStore from '@/store/modules/user';
  import {reqChangeState} from '@/utils/request/api'
  import { ElMessage } from 'element-plus';

  const $router = useRouter()
  const $route = useRoute()
  const userStore = useUserStore();
  
  import useSettingStore from '@/store/modules/setting'

  const refreshStore=useSettingStore();
  // 刷新
  const handleRefresh = ()=>{
    refreshStore.refresh=!refreshStore.refresh
  };
  // 全屏
  const fullScreen=()=>{
    // 利用DOM元素的属性判断当前是否为全屏模式：是：true 否：null
    let full = document.fullscreenElement;
    
    // 切换为全屏
    if(!full){
      document.documentElement.requestFullscreen();
    }else{
      // 退出全屏
      document.exitFullscreen();
    }
  };
  const logout = ()=>{
    if(confirm('确定要退出登录吗？')){
      // 1.向服务器发请求，调用推出登录接口（这里mock没有该接口）
      // 2.清空仓库中用户相关的数据[token|avatar|username]-调用方法
      // 3.跳转登录页面
      userStore.clearUserInfo()
      // localStorage.removeItem('TOKEN')
      // 跳转
      // 重新登录需要回到上一次的地方，如：用户管理  -----路由传参，重定向
      // 去login判断登录时是否有query参数，无则跳首页，有则跳query.path
      $router.push({path:'/login',query:{redirect:$route.path}})
   }
  }
  // 退出登录
  //  async function logout:Promise<any>() {
  //   if(confirm('确定要推出登录吗？')){
  //     // 1.向服务器发请求，调用推出登录接口（这里mock没有该接口）
  //     // 2.清空仓库中用户相关的数据[token|avatar|username]-调用方法
  //     // 3.跳转登录页面
  //     if(localStorage.getItem('TOKEN')){
  //       await reqChangeState(localStorage.getItem('TOKEN') as string,false)
  //     }
  //     localStorage.removeItem('TOKEN')
  //     userStore.clearUserInfo()

  //     // 跳转
  //     // 重新登录需要回到上一次的地方，如：用户管理  -----路由传参，重定向
  //     // 去login判断登录时是否有query参数，无则跳首页，有则跳query.path
  //     $router.push({path:'/login',query:{redirect:$route.path}})
  //  }
  // };
  // async function logout() {
  //   if(confirm('确定要推出登录吗？')){
  //     // 1.向服务器发请求，调用推出登录接口（这里mock没有该接口）
  //     // 2.清空仓库中用户相关的数据[token|avatar|username]-调用方法
  //     // 3.跳转登录页面
  //     if(localStorage.getItem('TOKEN')){
  //       await reqChangeState(localStorage.getItem('TOKEN') as string,false)
  //     }
  //     $router.push('/login')
  //     localStorage.removeItem('TOKEN')
  //     userStore.clearUserInfo()
  //     // 跳转
  //     // 重新登录需要回到上一次的地方，如：用户管理  -----路由传参，重定向
  //     // 去login判断登录时是否有query参数，无则跳首页，有则跳query.path
      
  //     ElMessage({
  //       message: '已退出登录',
  //       type: 'success',
  //   })
  //  }
    
  // }
</script>
  
<style lang="scss" scoped>
  img{
      width: 30px;
      height: 30px;
      margin:0 10px;
    }
</style>