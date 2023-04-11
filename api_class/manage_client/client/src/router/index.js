import { createRouter, createWebHashHistory } from "vue-router";
import { ElMessage } from "element-plus";
import {useDataStore} from '../store/index'

const routes = [
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
    children: [
      {
        path: "/questionList",
        name: "questionList",
        meta:{name:'问题列表'},
        component: () => import("../views/questionList.vue"),
      },
      {
        path: "/user",
        name: "User",
        component: () => import("../views/user.vue"),
        children: [
          {
            path: "following",
            name: "following",
            component: () => import("../views/following.vue"),
            meta:{name:'粉丝列表'}
          },
          {
            path: "topicList",
            name: "topicList",
            component: () => import("../views/topicList.vue"),
            meta:{name:'话题列表'}
          },
        ],
      },
      {
        path: "/topics",
        name: "topics",
        meta:{name:'话题'},
        component: () => import("../views/topics.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
];

const  router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('token')
  // console.log(to)
  const {path,meta} = to
  useDataStore().setBreadcrumb({path,name:meta.name})
  useDataStore().getRoute(to.path)
  if(!token && to.path.startsWith('/login')){
    next()
  }else if(!token && !to.path.startsWith('/login')){
    ElMessage.error("请登入")
    next('/login')
  }else if(to.path.startsWith('/login')){
    localStorage.removeItem('token')
  }
  next()

})

export default router;
