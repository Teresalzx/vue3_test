<template>
    <div class="tabbar">
      <div class="tabbar-left">
        <Breadcrumb/>
      </div>
      <div class="tabbar-right">
        <Setting/>
      </div>
    </div>
  </template>
  
  <script setup lang='ts' name="Tabbar">
    import Breadcrumb from './breadcrumb/index.vue'
    import Setting from './setting/index.vue'
  </script>
  
  <style scoped lang="scss">
    .tabbar{
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100%;   
    }
    .tabbar-left{
      display: flex;
      padding:20px;
      align-items: center;
    }
    .tabbar-right{
      display: flex;
      align-items: center;
      justify-content: right;
      .el-button{
        margin:0 5px;      
      }
      
    }
  </style>