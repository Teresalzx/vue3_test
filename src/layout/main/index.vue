<!-- 此文件是二级路由组件， 内容展示区文件 -->
<template>
    <!-- 路由组件出口位置 -->
      <!-- 点击菜单时，会把相应组件注入进来 -->
      <router-view v-slot="{Component}"> 
        <transition name="fade">
          <!-- 通过全局组件conponent进行渲染 -->
          <component :is="Component" v-if="falg"/>
        </transition>
      </router-view>
   </template>
    
   <script setup lang='ts' name="Main">
    import { watch,ref,nextTick} from 'vue';
    import useSettingStore from '@/store/modules/setting'
    const refreshStore=useSettingStore();
  
    // 组件销毁，用v-if
    let falg = ref(true)
  
    //  watch监听Refresh是否发生变化
    watch(()=>refreshStore.refresh,()=>{
      falg.value=false  //v-if="false"为该组件不显示，需要销毁
      nextTick(()=>{
        falg.value=true
      })
    })
   </script>
    
   <style lang="scss" scoped>
   .fade-enter-from{
    opacity: 0;
    transform: scale(0);
   }
   .fade-enter-active{
    transition: all 0.5s;
   }
   .fade-enter-to{
    opacity: 1;
    transform: scale(1);
   }
    
   </style>