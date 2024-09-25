import type { RouteRecordRaw } from "vue-router"; //路由ts类型
 //路由ts类型
// 常量路由
export const constRoutes:Array<RouteRecordRaw> = [
  // 首页
  {
      path: '/',
      redirect: '/home',
      name: 'Layout',
      component:()=>import('@/layout/index.vue'),
      meta: {
          title: '',
          icon: '',
          isHidden: true
      },
      children: [
          {
              path: '/home',
              name: 'Home',
              // label: '首页',
              component: () => import('@/views/home/index.vue'),
              meta: {
                  title: '首页',
                  icon: 'HomeFilled',
                  isHidden: false
              },
          },
      ]
  },
  // 登录页
  {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    //   label: '登录',
      meta: {
          title: '登录',
          icon: 'Promotion',
          isHidden: true //隐藏
      },
  },
  // 404
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    // label: '404',
    meta: {
        title: '404',
        icon: 'DocumentDelete',
        isHidden:true
    },
},
// 数据可视化
{
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    // label: '数据可视化',
    meta: {
        title: '数据大屏',
        isHidden:false,
        icon:'Platform'
    },
},
  // 商品管理
  {
    path: '/product',
    redirect: '/product/brand',
    name: 'Product',
  //   label: '商品管理',
    component: () => import('@/layout/index.vue'),
    meta: {
        title: '商品管理',
        icon: 'ShoppingBag',
        isHidden: false
    },
    children: [
        {
            path: '/product/brand',
            name: 'productBrand',
            component: () => import('@/views/product/brand/index.vue'),
          //   label: '品牌管理',
            meta: {
                title: '品牌管理',
                icon: 'ShoppingCartFull',
                isHidden: false
            },
        },
        {
            path: '/product/spu',
            name: 'producSpu',
          //   label: 'SPU管理',
            component: () => import('@/views/product/spu/index.vue'),
            meta: {
                title: 'SPU管理',
                icon: 'Shop',
                isHidden: false
            },
        },
        {
            path:'/product/attr',
            name:'Attr',
            component:()=>import('@/views/product/attr/index.vue'),
            meta:{
                title:'属性管理',
                icon:'ChromeFilled'
              }
        },
        {
            path: '/product/sku',
            name: 'producSku',
          //   label: 'SKU管理',
            component: () => import('@/views/product/sku/index.vue'),
            meta: {
                title: 'SKU管理',
                icon: 'Shop',
                isHidden: false
            },
        },
    ]
},
 // 权限管理
 {
    path: '/acl',
    redirect: '/acl/user',
    name: 'Acl',
  //   label: '权限管理',
    component: () => import('@/layout/index.vue'),
    meta: {
        title: '权限管理',
        icon: 'Histogram',
        isHidden: false
    },
    children: [
        {
            path: '/acl/user',
            name: 'aclUser',
          //   label: '用户管理',
            component: () => import('@/views/acl/user/index.vue'),
            meta: {
                title: '用户管理',
                icon: 'User',
                isHidden: false
            },
        },
        {
            path: '/acl/role',
            name: 'aclRole',
          //   label: '角色管理',
            component: () => import('@/views/acl/role/index.vue'),
            meta: {
                title: '角色管理',
                icon: 'UserFilled',
                isHidden: false
            },
        },
        {
            path: '/acl/permission',
            name: 'aclMenus',
          //   label: '菜单管理',
            component: () => import('@/views/acl/menus/index.vue'),
            meta: {
                title: '菜单管理',
                icon: 'List',
                isHidden: false
            },
        },
    ]
},
 // 任意路由
 {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  //   label: '任意路由',
    meta: {
        title: '任意路由',
        isHidden: true,
        icon: 'DataLine'
    }
},
]

// 异步路由
// export const asyncRoutes = [
//   // 商品管理
//   {
//       path: '/product',
//       redirect: '/product/trademark',
//       name: 'Product',
//     //   label: '商品管理',
//       component: () => import('@/layout/index.vue'),
//       meta: {
//           title: '商品管理',
//           icon: 'ShoppingBag',
//           isHidden: false
//       },
//       children: [
//           {
//               path: '/product/brand',
//               name: 'productBrand',
//               component: () => import('@/views/product/trademark/index.vue'),
//             //   label: '品牌管理',
//               meta: {
//                   title: '品牌管理',
//                   icon: 'ShoppingCartFull',
//                   isHidden: false
//               },
//           },
//           {
//               path: '/product/spu',
//               name: 'producSpu',
//             //   label: 'SPU管理',
//               component: () => import('@/views/product/spu/index.vue'),
//               meta: {
//                   title: 'SPU管理',
//                   icon: 'Shop',
//                   isHidden: false
//               },
//           },
//           {
//               path: '/product/sku',
//               name: 'producSku',
//             //   label: 'SKU管理',
//               component: () => import('@/views/product/sku/index.vue'),
//               meta: {
//                   title: 'SKU管理',
//                   icon: 'Shop',
//                   isHidden: false
//               },
//           },
//       ]
//   },

//   // 权限管理
//   {
//       path: '/acl',
//       redirect: '/acl/user',
//       name: 'Acl',
//     //   label: '权限管理',
//       component: () => import('@/layout/index.vue'),
//       meta: {
//           title: '权限管理',
//           icon: 'Histogram',
//           isHidden: false
//       },
//       children: [
//           {
//               path: '/acl/user',
//               name: 'aclUser',
//             //   label: '用户管理',
//               component: () => import('@/views/acl/user/index.vue'),
//               meta: {
//                   title: '用户管理',
//                   icon: 'User',
//                   isHidden: false
//               },
//           },
//           {
//               path: '/acl/role',
//               name: 'aclRole',
//             //   label: '角色管理',
//               component: () => import('@/views/acl/role/index.vue'),
//               meta: {
//                   title: '角色管理',
//                   icon: 'UserFilled',
//                   isHidden: false
//               },
//           },
//           {
//               path: '/acl/permission',
//               name: 'aclMenus',
//             //   label: '菜单管理',
//               component: () => import('@/views/acl/permission/index.vue'),
//               meta: {
//                   title: '菜单管理',
//                   icon: 'List',
//                   isHidden: false
//               },
//           },
//       ]
//   },
// ]

// 任意路由
// export const anyRoutes = [
//   // 任意路由
//   {
//       path: '/:pathMatch(.*)*',
//       redirect: '/404',
//       name: 'Any',
//     //   label: '任意路由',
//       meta: {
//           title: '任意路由',
//           isHidden: true,
//           icon: 'DataLine'
//       }
//   },
// ]

// import type {RouteRecordRaw} from 'vue-router'
// export const constRoutes:Array<RouteRecordRaw>=[
//   {
//     // 登录路由
//     path:'/login',
//     component:()=>import('@/views/login/index.vue'),
//     name:'login',
//     meta:{
//       title:'登录',
//       isHidden:true ,//是否隐藏：是
//       icon:"Promotion"
//     }
//   },
//   {
//     // 登录成功后,首页
//     path:'/',
//     component:()=>import('@/layout/index.vue'),
//     name:'layout',
//     // 重定向到home
//     redirect:'/home',
//     meta:{
//       title:'',
//       isHidden:true,
//       icon:''
//     },
//     children:[
//       {
//         path:'/home',
//         component:()=>import('@/views/home/index.vue'),
//         meta:{
//           title:'首页',
//           isHidden:false,
//           icon:'HomeFilled'
//         }
//       },
      
//     ]
//   },
//   {
//     // 数据大屏一级路由
//     path:'/screen',
//     component:()=>import('@/views/screen/index.vue'),
//     name:'data',
//     meta:{
//       title:'数据大屏',
//       isHidden:false,
//       icon:'Platform'
//     }
//   },
//   {
//     // 404
//     path:'/404',
//     component:()=>import('@/views/404/index.vue'),
//     name:'404',
//     meta:{
//       title:'404',
//       isHidden:true,
//       icon: 'DocumentDelete'
//     }
//   },
//   // {
//   //   // 其余的重定向到404
//   //   path:'/:pathMatch(.*)*',
//   //   redirect:'/404',
//   //   name:'Any',
//   //   meta:{
//   //     title:'---404',
//   //     isHidden:true,
//   //     icon: 'DocumentDelete'
//   //   }
//   // },

//   // 权限管理
//   {
//     path:'/acl',
//     component:()=>import('@/layout/index.vue'),
//     name:'Acl',
//     meta:{
//       title:'权限管理',
//       isHidden:false,
//       icon:'Platform'
//     },
//     redirect:'/acl/user',
//     children:[
//       {
//         path:'/acl/user',
//         component:()=>import('@/views/acl/user/index.vue'),
//         name:'User',
//         meta:{
//           title:'用户管理',
//           icon:'User'
//         }
//       },
//       {
//         path:'/acl/role',
//         component:()=>import('@/views/acl/role/index.vue'),
//         name:'Role',
//         meta:{
//           title:'角色管理',
//           icon:'UserFilled'
//         }
//       },
//       {
//         path:'/acl/permission',
//         component:()=>import('@/views/acl/permission/index.vue'),
//         name:'Permission',
//         meta:{
//           title:'菜单管理',
//           icon:'Monitor'
//         }
//       },
//     ]
//   },
//   // 商品管理
//   {
//     path:'/product',
//     component:()=>import('@/layout/index.vue'),
//     name:'Product',
//     meta:{
//       title:'商品管理',
//       isHidden:false,
//       icon:'Goods'
//     },
//     redirect:'/product/trademark',
//     children:[
//       {
//         path:'/product/trademark',
//         component:()=>import('@/views/product/trademark/index.vue'),
//         name:'Trademark',
//         meta:{
//           title:'品牌管理',
//           icon:'ShoppingCartFull'
//         }
//       },
//       {
//         path:'/product/attr',
//         component:()=>import('@/views/product/attr/index.vue'),
//         name:'Attr',
//         meta:{
//           title:'属性管理',
//           icon:'ChromeFilled'
//         }
//       },
//       {
//         path: '/product/spu',
//         component: () => import('@/views/product/spu/index.vue'),
//         name: "Spu",
//         meta: {
//             title: 'SPU管理',
//             icon: 'Calendar',
//         }
//       },
//       {
//         path: '/product/sku',
//         component: () => import('@/views/product/sku/index.vue'),
//         name: "Sku",
//         meta: {
//             title: 'SKU管理',
//             icon: 'Orange',
//         }
//       },
//     ]
//   }
// ]