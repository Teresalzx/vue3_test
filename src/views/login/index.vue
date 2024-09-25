<template>
    <div class="login_container">
        <el-row :gutter="0">
            <!-- 屏幕宽度小于768，左侧不占位置，右侧占全部位置:xs -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" ref="loginForms" :model="loginForm" :rules="rules">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="userNumber">
                        <el-input :prefix-icon="User" v-model="loginForm.userNumber"></el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <el-input text="passWord" :prefix-icon="Lock" v-model="loginForm.passWord"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" :loading="loading" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts' name="App">
import { Lock, User } from "@element-plus/icons-vue"
import { ref, reactive } from 'vue'
import { ElNotification } from "element-plus"
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

import { reqLogin, reqChangeState } from '@/utils/request/api'

import { useRouter, useRoute } from "vue-router"
const $router = useRouter()
const $route = useRoute()

let userStore = useUserStore()

let loginForm = reactive({ userNumber: 'admin', passWord: '123456' })
let loginForms = ref()
let loading = ref(false)
// 自定义校验规则
let checkUsername = (rule: any, value: any, callback: any) => {
    // rule:校验规则对象
    // value：表单元素文本内容
    // callback:函数，符合则放行通过，不符合则注入错误提示信息
    if (!value.trim()) {
        callback(new Error('该字段不能为空！'))
        // .test(value)不能忘,否则不会生效
    } else if (!(/^[a-zA-Z0-9]{4,10}$/).test(value)) {  //^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$
        callback(new Error('用户名必须为4到10位的字母或数字！'))
    } else {
        callback()
    }
}

// 定义表单校验需要的配置项
let rules: any = {
    userNumber: [
        // { required: true, min: 4, max: 10, message: '长度必须在4到10位', trigger: 'change' },
        { trigger: 'change', validator: checkUsername }
    ],
    passWord: [
        { required: true, min: 6, max: 20, message: '长度必须在6到20位', trigger: 'blur' }
    ]
}


// 登录方法
// 在方法前加上 async 关键字，表示该方法是异步的
// await 关键字用于等待一个异步操作完成。它会暂停方法的执行，直到异步操作完成，
// 然后继续执行方法的剩余部分。
// 释放线程：在等待异步操作完成时，await 会释放当前线程，使其可以执行其他任务，
// 从而提高应用程序的并发性能。
const login = async () => {
    // 表单校验通过才发请求
    // validate	任一表单项被校验后触发 是ElementPlus里Form表单里的FormAPI事件
    await loginForms.value.validate()
    // 给登录的时间,登录按钮加一个加载中...loading效果
    loading.value = true
    // 发请求,调用api接口
    // 向服务器发请求,判断该用户是否存在,若存在,返回token

    const result = (await reqLogin(loginForm)) as any
    console.log('11',result);
    if (result.code === 200 && result.status === 1) {
        // 若是登录成功,本地存储token
        localStorage.setItem('TOKEN', result.token)
        // localStorage.setItem('userInfo', result.userInfo)
        await reqChangeState(result.token, true)
        await userStore.getUserInfo()
        
        // 编程式导航跳转到首页或query参数
        // let redirect: any = $route.query.redirect
        // $router.push({ path: redirect || '/' })

        // 若有携带的参数
        if ($route.query.redirct) {
            // 则重定向到该组件
            $router.push(($route.query.redirct as string))
        } else {
            // 否则进入首页
            $router.push('/')
            
        }
        

        // 登录成功的提示信息,用了elementui的notifiction通知框
        // 需引入ElNotification
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi,${getTime()}好`
        })
        // 登录成功后加载样式消失
        loading.value = false
    } else {
        ElNotification({
            type: 'error',
            message: result.message
        })
    }

}


</script>

<style lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom right, #d8204591, #1f707dac);
    overflow: hidden;

    .login_form {
        position: relative;
        width: 80%;
        top: 20vh;
        padding: 40px;
        // z-index: 100;
        border-radius: 18px;
        overflow: hidden;

        h1 {
            color: #fff;
            font-size: 40px;
        }

        h2 {
            color: #fff;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%
        }
    }

    .login_form::before {
        content: "";
        width: calc(100% + 30px);
        height: calc(100% + 20px);
        position: absolute;
        top: -10px;
        left: -10px;

        box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.1);
        filter: blur(10px);
        // z-index: -1;
    }
}
</style>