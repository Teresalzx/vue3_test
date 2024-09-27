<template>
  <div class="container">
    <!-- 左侧菜单导航 -->
     <!-- :class="{fold:settingFold.fold?true:false}" -->
    <div class="item slide_nav" >
      <!-- logo -->
      <!-- <Logo></Logo> -->
      <!-- 菜单展示区 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <!-- background-color="#001529" text-color="white"
        active-text-color="yellowgreen"  ffd04b-->
         <el-menu 
         text-color="white"
         active-text-color="pink" router 
         style="border-right: none;"
         :default-active="$route.path"
         :collapse="settingFold.fold"
        
         >
         <Logo></Logo>
          <Menu :menuList="userStore.menuRoutes"></Menu>
         </el-menu>        
   
      </el-scrollbar>      
    </div>
    <!-- 右上导航区 -->
    <div class="item layouttabbar" :class="{fold:settingFold.fold?true:false}">
      <Tabbar/>
    </div>
    <!-- <div class="item">3</div> -->
     
     <!-- 内容展示区 -->
    <div class="item main_content" :class="{fold:settingFold.fold?true:false}">
      <!-- <p style="height: 5000px; background-color: red;">abcd</p> -->
      <!-- <router-view></router-view> -->
      <Main></Main>
    </div>
  </div>
</template>
  
<script setup lang='ts' name="layout">
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import Main from './main/index.vue'
  import Tabbar from './tabbar/index.vue'
  // 获取路由对象
  import {useRoute} from 'vue-router'
  const $route=useRoute()

  import useUserStore from '@/store/modules/user'
  import useSettingStore from '@/store/modules/setting'
  let settingFold = useSettingStore()
  let userStore=useUserStore()

  
</script>
  
<style scoped lang="scss">
.container{
  display:grid;
  width: 100%;
  height:100vh;
  // 均分为两列
  // grid-template-columns: repeat(2,1fr);

  grid-template-columns: 300px repeat(1,1fr);

  // grid-template-rows 属性在网格容器中设置行的高度:
  grid-template-rows: 75px;

  .slide_nav{
    // 合并1 3
    grid-row: span 2;
    
    background-color: $base-slider-bgcolor;
    // 需加宽度才有动画效果
    width: 300px;
    transition: all .3s;
    .scrollbar{
      width: 300px;
      height: calc(100vh - $base-slider-logo-height);
      background-color:$base-slider-bgcolor;
      position: fixed;
    }
    &.fold{
      width:$base-menu-min-width;
     
    }
  }
  .main_content{
    // width: 100%;
    width:calc(100vw - 300px) ;
    padding:20px;
    transition: all .3s;
    // overflow-y: scroll;
    background-color:skyblue;
    &.fold{
      width:calc(100vw - $base-menu-min-width - 15px);
      transform: translateX(calc(-300px + $base-menu-min-width + 14px));
    }
  }
  .layouttabbar{
    width:calc(100vw - 300px) ;
    height:75px;
    transition: all 0.3s;
    background-color: pink;
    
    
    &.fold{
        width:calc(100vw - $base-menu-min-width - 15px);// 这里是向右扩展了
        // transform: translateX(calc(-100vw + $base-menu-min-width ));
        transform: translateX(calc(-300px + $base-menu-min-width + 14px));
      }
  }
  
}
.item {
  // border: 1px solid black;
  // background-color: rgba(120,145,159,0.4);
  background-color: #fff;
}
  
</style>