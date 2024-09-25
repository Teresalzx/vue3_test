<template>
  <!-- <el-menu background-color="rgba(120, 145, 159, 0.8)" active-text-color="#ffd04b">
      <el-menu-item index="1" >首页</el-menu-item>
      <el-menu-item index="2" >数据大屏</el-menu-item>
      <el-sub-menu>
        <template #title index="3">权限管理</template>
<el-menu-item index="3-1">用户管理</el-menu-item>
<el-menu-item index="3-2">角色管理</el-menu-item>
<el-menu-item index="3-3">菜单管理</el-menu-item>
</el-sub-menu>
<el-menu-item index="4">商品管理</el-menu-item>

</el-menu> -->

  <!-- 根据路由动态生成菜单 -->
  <template v-for="(item) in menuList" :key="item.name">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <!-- 是否启用 vue-router 模式。
        启用该模式会在激活导航时以 index 作为
       path 进行路由跳转 使用 default-active 来设置加载时的激活项。 -->
      <!-- <el-menu active-text-color="#ffd04b" router> -->
        <el-menu-item :index="item.path" v-show="!item.meta.isHidden">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>   
        </el-menu-item>
      <!-- </el-menu> -->
    </template>

    <!-- 有且仅有一个路由 -->
    <template v-if="item.children && item.children.length === 1">

        <el-menu-item :index="item.children[0].path" v-show="!item.children[0].meta.isHidden" >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>

    </template>

    <!-- 有不止一个子路由 -->
    <template v-if="item.children && item.children.length > 1">

        <el-sub-menu :index="item.path" >          
          <template #title>  
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="c in item.children" :key="c.name" :index="c.path" v-show="!c.meta.isHidden">
            <el-icon>
              <component :is="c.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ c.meta.title }}</span>
            </template>
            
          </el-menu-item>
        </el-sub-menu>

        <!-- <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu> -->

    </template>
  </template>

</template>

<script setup lang='ts' name="Menu">
// import {useRouter} from 'vue-router'
defineProps(['menuList'])
// 获取路由器对象
// let $router = useRouter();
</script>

<style scoped lang="scss">
.el-icon{
  margin-right: 10px;
}
.el-menu{
  background-color:$base-slider-bgcolor;
}

</style>
