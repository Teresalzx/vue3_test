<template>
    <el-icon @click="changFold">
      <!-- <Fold /> -->
      <component :is="settingFold.fold?'Expand':'Fold'"></component>
    </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <!-- v-if比v-for优先级高 -->
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
          <el-icon style="margin: 0px 5px;">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
      </el-breadcrumb>
</template>
  
<script setup lang='ts' name="Breadcrumb">
  import { ArrowRight } from '@element-plus/icons-vue'
  import useSettingStore from '@/store/modules/setting'

  import {useRoute} from 'vue-router'
  let $route=useRoute()
  let settingFold = useSettingStore()
  
  const changFold=()=>{
    settingFold.fold=!settingFold.fold
  }
</script>
  
<style>
  .el-breadcrumb{
      margin-left: 10px;
      .el-icon{
        /* 顶部对齐 */
        vertical-align: top;
      }
    }
</style>