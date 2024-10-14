<template>
  <el-button icon="Refresh" circle @click="handleRefresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="top-start" title="主题设置" :width="250" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="黑夜模式">
        <el-switch v-model="settingStore.$state.dark"  style="margin-left: 24px" inline-prompt active-icon="Sunny"
          inactive-icon="Moon" @change="changeDark"/>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img :src="userStore.userInfo.avatar" alt="" style="border-radius: 50%;">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userInfo.userName }}
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
import { useRouter, useRoute } from 'vue-router';
import useUserStore from '@/store/modules/user';
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore();

// 先调用获取用户信息的方法，获取头像和名字，得到数据后才能显示出来
userStore.getUserInfo()

import useSettingStore from '@/store/modules/setting'
import { ref } from 'vue';
// const dark = ref<boolean>(true)
const settingStore = useSettingStore();
// 刷新
const handleRefresh = () => {
  settingStore.refresh = !settingStore.refresh
};
// 全屏
const fullScreen = () => {
  // 利用DOM元素的属性判断当前是否为全屏模式：是：true 否：null
  let full = document.fullscreenElement;

  // 切换为全屏
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    // 1.向服务器发请求，调用推出登录接口（这里mock没有该接口）
    // 2.清空仓库中用户相关的数据[token|avatar|username]-调用方法
    // 3.跳转登录页面
    userStore.clearUserInfo()
    // localStorage.removeItem('TOKEN')
    // 跳转
    // 重新登录需要回到上一次的地方，如：用户管理  -----路由传参，重定向
    // 去login判断登录时是否有query参数，无则跳首页，有则跳query.path
    $router.push({ path: '/login', query: { redirect: $route.path } })
  }
}

// 黑夜模式 给html标签添加dark类
const changeDark = ()=>{
  let html = document.documentElement
  console.log(html);
  
  settingStore.$state.dark?html.className="dark":html.className=''
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// }
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
</style>