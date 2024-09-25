import { defineStore } from "pinia";
// import { reqGetUserinfo } from "@/utils/request/api";
import { constRoutes} from "@/router/routes";
import router from "@/router/index";
import { cloneDeep } from "lodash";
import type { TypeuserInfo } from "@/types/types";
import { ElMessage } from "element-plus";
import {reqLogin,reqGetUserinfo} from '@/utils/request/api'


const useUserStore = defineStore('User', {
    state: () => {
        return {
            token:localStorage.getItem('TOKEN'),//用户唯一标识
            userInfo: {} as TypeuserInfo,
            routes: [] as string[],
            menuRoutes:constRoutes,
            username:'',
            avatar:''
        }
    },
    actions: {
        // 用户登录的方法
        async userLogin(data:any){
            // 登录请求
            let result:any=await reqLogin(data)
            // console.log(result);
            // 成功 200 =》token：用户登录成功后的唯一标识
            // 失败 201 =》 返回错误信息
            // console.log(result);     
            if(result.code===200){
            // pinia仓库存储token
            this.token=result.data.token as string
            // console.log(this.token);   
            // 本地存储，使pinia存储token持久化
            localStorage.setItem('TOKEN',result.data.token as string)
            // 保证当前async函数返回一个成功的promise
            return 'ok'
            }else{
            // 登陆失败
            return Promise.reject(new Error(result.data.message))
            }
        },
        // 退出登录清空数据
        clearUserInfo() {
            this.userInfo = {},
            this.token='',
            localStorage.removeItem('TOKEN')
            localStorage.removeItem('userInfo')
        },
        
        // 获取用户数据
        // async update() {
        //     // 更新用户信息
        //     const result = await reqGetUserinfo()
        //     ElMessage.closeAll()
        //     if (!result) return
        //     // 如果获取不到用户信息 就需要重新登录
        //     if (result.status == -1) {
        //         return
        //     }
        //     this.userInfo = result.data
        //     // const arr = filterRoutes(cloneDeep(asyncRoutes), result.data.routes)
        //     // const list = [...arr, ...anyRoutes]
        //     // list.forEach((item: any) => {
        //     //     router.addRoute(item)
        //     // });
        //     // this.routes = [...constRoutes, ...arr]
        //     // sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        // },
        async getUserInfo(){
            let result = await reqGetUserinfo()   
            console.log('用户信息',result.data);
                                 
            if(!result) return
            // 若获取不到用户信息,需要重新登陆
            if(result.status==-1) return
            this.userInfo=result.data
            localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
           return this.userInfo
        }
    },
    getters: {}
})
// 异步路由过滤方法
// function filterRoutes(asyncRoutes: any, routes: any) {
//     return asyncRoutes.filter((item: any) => {
//         if (routes.includes(item.name)) {
//             if (item.children && item.children.length > 0) {
//                 item.children = filterRoutes(item.children, routes)
//             }
//             return item
//         }
//     });
// }

export default useUserStore