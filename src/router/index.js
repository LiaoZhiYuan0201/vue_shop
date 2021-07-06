import Vue from 'vue'
import VueRouter from 'vue-router'


let Login = () => import( /* webpackChunkName:"login_home_welcome"*/ '../components/login.vue')

let Home = () => import( /* webpackChunkName:"login_home_welcome"*/ '@/components/home.vue')

let Welcome = () => import( /* webpackChunkName:"login_home_welcome"*/ '@/components/welcome.vue')

let Users = () => import( /* webpackChunkName:"users_rights_roles"*/ '@/components/user/users.vue')

let Rights = () => import( /* webpackChunkName:"users_rights_roles"*/ '@/components/power/rights.vue')

let Roles = () => import( /* webpackChunkName:"users_rights_roles"*/ '@/components/power/roles.vue')


let Cate = () => import( /* webpackChunkName:"cate_params"*/ '@/components/goods/cate.vue')

let Params = () => import( /* webpackChunkName:"cate_params"*/ '@/components/goods/params.vue')

let List = () => import( /* webpackChunkName:"list_add"*/ '@/components/goods/list.vue')

let Add = () => import( /* webpackChunkName:"list_add"*/ '@/components/goods/add.vue')


let Order = () => import( /* webpackChunkName:"order_report"*/ '@/components/order/order.vue')

let Report = () => import( /* webpackChunkName:"order_report"*/ '@/components/report/report.vue')


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
      redirect: '/Welcome',
      children: [{
          path: '/Welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/goods',
          component: List,
        },
        {
          path: '/goods/add',
          component: Add
        },
        {
          path: '/orders',
          component: Order
        },
        {
          path: '/reports',
          component: Report
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next();
  //获取token 
  let tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})

export default router
