import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '@/components/home.vue'
import Welcome from '@/components/welcome.vue'
import Users from '@/components/user/users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect:'/Welcome',
      children:[
        {
          path:'/Welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        }
      ]
    }
  ]
})

  router.beforeEach((to, from, next) => {
    if(to.path=='/login') return next();
    //获取token 
    let tokenStr =  window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login');
    next();
  })

export default router
