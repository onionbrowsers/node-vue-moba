import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path:'/article/:id',
        name:'article',
        component: () => import('../views/Article.vue'),
        props: true
      }
    ]
  },
  {
    path: '/heros/:id',
    name: 'hero',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Hero.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
