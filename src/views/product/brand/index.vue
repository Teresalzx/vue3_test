<template>
    <!-- <h1>我是品牌管理组件</h1> -->
    <el-card>
        <el-button type="primary" icon="Plus" @click="addBrand">添加品牌</el-button>
        <!-- 表格组件，展示已有平台数据 -->
        <el-table border style="margin: 10px 0;" :data="tableData">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" prop="brandName" align="center"> </el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <!-- 插槽写法 -->
                <template #="{ row, $index }">
                    <img :src="row.brandLogo" alt="没有logo图片" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{ row, $index }">
                    <!-- row:已有品牌的数据，$index:索引值 -->
                    <el-tooltip effect="dark" content="编辑" placement="bottom-end">
                        <el-button type="warning" icon="Edit" @click="editBrand($index,row)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="删除" placement="bottom-end">
                        <el-button type="danger" icon="Delete" @click=""></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- 
            pagination:
                current-page:当前页数
                page-size:每页显示条目个数
                size:分页大小        
         -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 10, 20, 50, 100]"
            :background=true layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
            @current-change="getTableData" @size-change="getTableData" />

    </el-card>
    <!-- 对话框组件，弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="title" width="500px" :before-close="handleClose">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" >
            <el-form-item label="品牌名称" prop="brandName">
                <el-input :maxLength="20" v-model="ruleForm.brandName" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌Logo" prop="brandLogo">
                <!-- action:请求图片url:字符串 -->
                 <!--on-change 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用. 
                  TS类型：(uploadFile: UploadFile, uploadFiles: UploadFiles) => void -->
                <el-upload class="avatar-uploader" action="http://127.0.0.1:8080/myApi/uploadImg"
                    :show-file-list="false" 
                    :on-success="success" 
                    :before-upload="beforeAvatarUpload"
                    :on-change="change"
                    :data="ruleForm"
                    :headers="header"
                    ref="uploadRef">
                    <img v-if="ruleForm.brandLogo" :src="ruleForm.brandLogo" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 具名插槽 -->
        <template #footer>
            <el-button type="" @click="cancel">取消</el-button>
            <el-button type="" @click="confirm(ruleFormRef)">确定</el-button>
        </template>
    </el-dialog>

</template>

<script setup lang='ts' name="Brand">
import { onMounted, reactive, ref } from 'vue'
import { reqGetBrandData, reqUploadBrandName } from '@/utils/request/api'
import { ElMessage } from 'element-plus';
import type { UploadFile, UploadFiles, UploadInstance, UploadProps } from 'element-plus' //Ts类型

import Dialog from './dialog.vue'
import emitter from '@/utils/emitter'
let pageNo = ref(1)
let limit = ref(3)

let title = ref('')  //弹窗标题
const addDialogRef = ref()  //获取弹窗组件实例
const uploadRef = ref<UploadInstance>() //upload组件


const tableData: any = ref([]) //表格数据
let total: any = ref(0)


import type { FormInstance, FormRules } from 'element-plus'

let dialogFormVisible = ref<boolean>(false) // 弹窗是否出现
const ruleFormRef = ref<FormInstance>()  // form表单类型

// 由于没有token,所以请求失效
const header = {
    token:localStorage.getItem('TOKEN')
}
// 品牌弹窗表单数据初始化
let ruleForm = reactive({
    brandName: '',
    brandLogo: '',
    brandId: '',
    sortID: ''
})

// 规则
const rules = reactive<FormRules<typeof ruleForm>>({
    brandName: [
        { required: true, message: '品牌名称不能为空', trigger: 'blur', },
    ],
    brandLogo: [
        { required: true, message: '品牌Logo不能为空', trigger: 'blur', },
    ]
})

// 弹窗×事件
const handleClose = ()=>{
    dialogFormVisible.value = false
    // 清空表单数据
    ruleFormRef.value!.clearValidate() //清除表单验证错误信息
    ruleForm.brandLogo = ''
    ruleForm.brandName = ''
    ruleForm.brandId = ''
    ruleForm.sortID=''
}

// 对话框底部取消按钮
const cancel = () => {
    dialogFormVisible.value = false
   
    ruleForm.brandLogo = ''
    ruleForm.brandName = ''
    ruleForm.brandId = ''
    ruleForm.sortID = ''
}

// 获取图片数据
// 图片选择事件
// 图片转换为url,并且赋值给表单,让其在页面上
const change:UploadProps['onChange'] =async (uploadFile: UploadFile, uploadFiles: UploadFiles)  => {
    // console.log(uploadFile,uploadFiles);
    ruleForm.brandLogo =window.URL.createObjectURL(uploadFile.raw as File)
  
}

// 对话框底部确定按钮
const confirm = async (formEl:FormInstance | undefined) => { 
    // 若form表单为空
   if(!formEl) return 
   dialogFormVisible.value = false
    // valid 为布尔值
   await formEl.validate()
   if(title.value === '添加品牌'){
     uploadRef.value!.submit()
   }
   else {
    const result = await reqUploadBrandName(ruleForm.brandId,ruleForm.brandName)
    // console.log(result);
    if(result.code == 200 && result.status===1){
      uploadRef.value!.submit()
      getTableData()
    }       
   }

}

// 添加品牌回调
const addBrand = () => {
    dialogFormVisible.value = true //对话框显示
    title.value ='添加品牌'
    // 清空收集数据
    // 要获取表单数据    
    ruleForm.brandLogo = ''
    ruleForm.brandName = ''
    ruleForm.brandId = ''
    ruleForm.sortID = ''
}

// 编辑品牌回调
const editBrand =async (index:number,data:any) => {
    dialogFormVisible.value = true  //获取弹窗
    title.value = '编辑品牌'
    // 要得到此品牌的数据
    if(data){
        // console.log(data);
        // 将得到数据传给弹窗
        ruleForm = Object.assign(ruleForm,data)
    }
    
}

// 图片选择改变事件


// 上传图片组件-->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //   钩子是在图片上传成功前触发，上传文件之前约束文件格式  
    // console.log(rawFile);  
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif' || rawFile.type === 'image/jpeg') {
        if (rawFile.size / 1024 / 1024 <= 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '文件大小不能超过4MB'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '文件格式为jpg|gif|png|jpeg'
        })
        return false
    }
}

// 图片上传成功的钩子
function success(res: any) {
    ElMessage.closeAll()
    // console.log(res);

    if (res.status == 1) {
        ElMessage({
            showClose: true,
            message: '上传成功',
            type: 'success',
            grouping: true,
        })
        // 上传成功后调用获取表格数据接口，重新渲染
        getTableData()
    } else {
        ElMessage({
            showClose: true,
            message: '上传失败',
            type: 'error',
            grouping: true,
        })
    }
    // handleClose()
}


// 获取表格数据事件
async function getTableData() {
    const pageData = {
        currentPage: pageNo.value,
        pageSize: limit.value
    }
    const result: any = await reqGetBrandData(pageData)
    // console.log(result);
    if (!result) return
    tableData.value = result.data.tableData
    total.value = result.data.total
    ElMessage({
        type: 'success',
        message: result.message
    })
}
onMounted(() => {
    getTableData()
})

</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
.el-upload img {
    width: 200px;
    height: 200px;
}
</style>