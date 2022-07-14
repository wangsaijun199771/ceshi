import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "index",
    redirect: 'login',
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    redirect:"/home/index",
    children:[
      {
        path:"index",
        name:"index",
        component:()=>import("../views/Index.vue")
      },
      {
        path:"document",
        name:"document",
        component:()=>import("../views/Document.vue")
      },
      {
        path:"lead",
        name:"lead",
        component:()=>import("../views/Lead.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },  
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    //登录界面不设权限
    next()
  } else {
    //非登录界面才设置权限
    let token = localStorage.getItem("token")
    if (token) {
      //有权限的
       next()
    } else {
      //没有权限
      next({name:"login"})
    }
  }
})

// router.beforeEach((to,from,next)=>{
//   //路由守卫不要使用for循环
//   if(token){
//     //token 说明登录成功有权限
//     return next() //中间键，代表下一个
//   }else{
//     //没有登录，没有权限
//     next({})
//   }
// })
export default router;