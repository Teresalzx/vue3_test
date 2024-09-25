<template>
    <el-button icon="Refresh" circle  @click="handleRefresh"></el-button>
      <el-button icon="FullScreen" circle  @click="fullScreen"></el-button>
      <el-button icon="Setting" circle></el-button>
      <img :src=" userStore.userInfo.avatar " alt="" style="border-radius: 50%;">
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

  const $router = useRouter()
  const $route = useRoute()
  const userStore = useUserStore();

  // 先调用获取用户信息的方法，获取头像和名字，得到数据后才能显示出来
  userStore.getUserInfo()

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

    
  // }
</script>
  
<style lang="scss" scoped>
  img{
      width: 30px;
      height: 30px;
      margin:0 10px;
    }
</style>