<template>
    <router-view></router-view>
</template>

<script setup lang='ts'>

</script>

<style>
.el-menu {
    background-image: linear-gradient(135deg, #EE9AE5 10%, #9c9fcc 100%) !important;
    background-color:#9888da91 ;
    /* background-color: inherit; */
     
    --el-menu-hover-bg-color:rgba(140, 88, 96, 0.426)
}

/* .el-menu-item:hover{
    background-color: rgba(73, 98, 120, 0.605) !important;
} */
::v-deep(.el-submenu__title:hover) {
  background-color: #b44040 ; 
  /* 二级菜单标题背景色 */
}






</style>