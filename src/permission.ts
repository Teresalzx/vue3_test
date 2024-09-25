import router from '@/router'
import NProgress from 'nprogress' ;
import 'nprogress/nprogress.css' ;
import { ElMessage } from 'element-plus';

// 引入用户相关仓库
import useUserStore from './store/modules/user';
// import NProgress from 'nprogress';

// 隐藏进度条右上角的转圈图标
NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  // userStore.getUserInfo()
  // 若有token,不能访问login,没有参数就访问home
  if(userStore.token){
    if(to.path=='/login'){
      next({path:'/',query:{redirect:to.path}})
    }
    else{     
      // 若访问的不是login,而是其他路由 
      let result:any =await userStore.getUserInfo()
    
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



