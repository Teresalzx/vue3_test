<template>
    <div class="logo" v-if="setting.logoHidden">
     <img :src="setting.logo" alt="">
     <p>{{setting.title}}</p>
    </div> 
 </template>
   
 <script setup lang='ts' name="Logo">
   import setting from '@/setting';
 </script>
   
 <style scoped lang="scss">
   .logo{
     width: 100%;
     height: $base-slider-logo-height;
     display: flex;
     align-items: center;
     padding: 8px;
    //  background-color: $base-slider-bgcolor;
     img{
       width: 40px;
       height: 40px;
     }
     p{
       margin-left: 25px;
       color: white;
       font-size: 20px;
       white-space: nowrap;//不自动换行
       // font-weight: lighter;
       // font-family: 'Courier New', Courier, monospace;
     }
   }
   
 </style>