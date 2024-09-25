<template>
    <!-- <h1>我是品牌管理组件</h1> -->
    <el-card>
        <el-button type="primary" icon="Plus">添加品牌</el-button>
        <!-- 表格组件，展示已有平台数据 -->
        <el-table border style="margin: 10px 0;">
            <el-table-column label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="品牌名称"> </el-table-column>
            <el-table-column label="品牌LOGO"> </el-table-column>
            <el-table-column label="品牌操作"> </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- 
            pagination:
                current-page:当前页数
                page-size:每页显示条目个数
                size:分页大小
        
         -->
        
            <el-pagination v-model:current-page=pageNo v-model:page-size=pageSize
                :page-sizes="[3, 10, 20, 50, 100]"   :background=true
                
                layout=" prev, pager, next, jumper,->,sizes,total" :total="400" />
       
    </el-card>


</template>

<script setup lang='ts' name="Trademark">
import { ref } from 'vue'
let pageNo = ref(1)
let pageSize = ref(1)
</script>

<style scoped lang="scss">
    
    .el-pagination{
        width: 100%;
    }
</style>