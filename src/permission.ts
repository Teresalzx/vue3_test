import router from '@/router'
import NProgress from 'nprogress' ;
import 'nprogress/nprogress.css' ;
import { ElMessage } from 'element-plus';

// 引入用户相关仓库
import useUserStore from './store/modules/user';
// import NProgress from 'nprogress';

// 隐藏进度条右上角的转圈图标
NProgress.configure({ showSpinner: false })
// router.beforeEach(async(to, from, next) => {
//   NProgress.start()
//   const userStore = useUserStore()
//   if(userStore.token){
//     // 若有token
//     // 不能访问login
//     // 登录成功，访问login时指向首页
//     if(to.path == '/login'){
//       next({path:'/'})
//     }else{
//       // 保证有用户信息才可访问其余路由
//       if(userStore.username){
//         // 有用户信息
//         next()
//       }else{
//         // 若无用户信息
//         try {
//           // 获取用户信息
//           await userStore.update()
//           next({...to}) 
//         } catch (error) {
//           // token过期，或用户手动修改了本地存储的token
//           // 1.退出登录 调用userLogout函数
//           await userStore.clearusername()
//           // 2.跳转到登录页面重新登录
//           next({path:'/login',query:{redirect:to.path}}) 
//         }      
//       }
//     }
//   }else{
//     // 无token，指向login
//     // 用户未登录判断
//     if(to.path=='/login'){
//       // 若访问的是登录界面，则放行
//       next();
//     }else{
//       // 否则，指向登录页面，携带参数
//       next({path:'/login',query:{redirect:to.path}})
//     }
//   }
  
//   next();
// });
// router.afterEach(()=>{
//   NProgress.done()
// })



router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  console.log('@@',userStore);
  
  // userStore.getUserInfo()
  // 若有token,不能访问login,没有参数就访问home
  if(userStore.token){
    if(to.path=='/login'){
      next({path:'/'})
    }
    else{     
      // 若访问的不是login,而是其他路由 
      let result:any =await userStore.getUserInfo()
      console.log('333',result);
      // 确保有用户信息
      if(result.userName){
        next()
      }
      else{
        // 若无用户信息
        try {
          // 发请求获取用户信息
          await userStore.getUserInfo()
          next()
        } catch (error) {
          // token过期,或手动修改了token
          // 清除用户信息
          // 退出登录,需重新登陆
          userStore.clearUserInfo()
          next({path:'/login',query:{redirect:to.path}})
        }
        // next()
      }        
    }
    next()
  }
  else{
    // 无token
    if(to.path=='/login'){
      next()
    }
    else{
      next({path:'/login',query:{redirect:to.path}})
      
    }
  }
  next()
});
router.afterEach(()=>{
  NProgress.done()
})

