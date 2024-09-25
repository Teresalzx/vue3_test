import service from "./index";
import type { User } from "@/types/types";

// 登录请求
export function reqLogin(data: any) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}
// 获取用户基本信息请求
export function reqGetUserinfo() {
    return service({
        url: '/getUserinfo',
        method: 'get',
    })
}
// 获取品牌管理数据请求
export function reqGetBrandData(pageData: any) {
    return service({
        url: '/getBrandData',
        method: 'post',
        data: pageData
    })
}
//  添加或编辑品牌数据请求
export function reqUploadBrandName(brandId: string, brandName: string,) {
    return service({
        url: '/uploadBrandName',
        method: 'post',
        data: {
            brandId,
            brandName
        }
    })
}
//  添加或编辑品牌数据请求
export function reqDelBrandData(brandId: string) {
    return service({
        url: '/delBrandData',
        method: 'post',
        data: {
            brandId
        }
    })
}
//  获取用户管理数据请求
export function reqGetAclUserData() {
    return service({
        url: '/getAclUserData',
        method: 'get',
    })
}
//  添加新用户请求
export function reqCreateUserData(userData: User) {
    return service({
        url: '/createUserData',
        method: 'post',
        data: {
            userData
        }
    })
}
//  编辑用户信息请求
export function reqEditUserData(userData: User) {
    return service({
        url: '/editUserData',
        method: 'post',
        data: {
            userData
        }
    })
}
//  删除用户数据
export function reqDelUserData(idArr: string[]) {
    return service({
        url: '/delUserData',
        method: 'post',
        data: {
            idArr
        }
    })
}
//  修改用户状态
export function reqChangeState(token: string, state: boolean) {
    return service({
        url: '/changeState',
        method: 'post',
        data: {
            token,
            state
        }
    })
}
//  获取所有异步路由的数据
export function reqGetAsyncRoute() {
    return service({
        url: '/getAsyncRoute',
        method: 'get',
    })
}
//  分配菜单权限
export function reqDistribute(arr: string[], userToken: string) {
    return service({
        url: '/distribute',
        method: 'post',
        data: {
            routes: arr,
            userToken: userToken
        }
    })
}
//  获取分配菜单权限
export function reqgetMenuRoutes(token: string) {
    return service({
        url: '/getMenuRoutes',
        method: 'post',
        data: {
            token
        }
    })
}

//  获取浏览板数据
export function reqGetMessage() {
    return service({
        url: '/getMessage',
        method: 'get',
    })
}

//  获取浏览板数据
export function reqaddMessage(data: any) {
    return service({
        url: '/addMessage',
        method: 'post',
        data
    })
}



