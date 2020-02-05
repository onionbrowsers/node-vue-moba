import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    redirect: '/categories/create',
    children: [
      // 分类菜单
      {
        path: '/categories/create',
        name: 'CategoryEdit',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        name: 'CategoryEditId',
        component: () => import('../views/CategoryEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: () => import('../views/CategoryList.vue')
      },
      // 新增物品菜单
      {
        path: '/items/create',
        name: 'GoodEdit',
        component: () => import('../views/GoodEdit.vue')
      },
      {
        path: '/items/edit/:id',
        name: 'GoodEditId',
        component: () => import('../views/GoodEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/items/list',
        name: 'GoodList',
        component: () => import('../views/GoodList.vue')
      },
      // 新增英雄菜单
      {
        path: '/heros/create',
        name: 'HeroEdit',
        component: () => import('../views/HeroEdit.vue')
      },
      {
        path: '/heros/edit/:id',
        name: 'HeroEditId',
        component: () => import('../views/HeroEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/heros/list',
        name: 'HeroList',
        component: () => import('../views/HeroList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
