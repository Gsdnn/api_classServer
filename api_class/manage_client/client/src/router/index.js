import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem('token')
    console.log(to.path)
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
  
  export default router
  