import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页面接口
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
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
      },
      // 新增文章菜单
      {
        path: '/articles/create',
        name: 'ArticleEdit',
        component: () => import('../views/ArticleEdit.vue')
      },
      {
        path: '/articles/edit/:id',
        name: 'ArticleEditId',
        component: () => import('../views/ArticleEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/articles/list',
        name: 'ArticleList',
        component: () => import('../views/ArticleList.vue')
      },
      // 新增广告位菜单
      {
        path: '/ads/create',
        name: 'AdEdit',
        component: () => import('../views/AdEdit.vue')
      },
      {
        path: '/ads/edit/:id',
        name: 'AdEditId',
        component: () => import('../views/AdEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/ads/list',
        name: 'AdList',
        component: () => import('../views/AdList.vue')
      },
      // 新增管理员菜单
      {
        path: '/admin_users/create',
        name: 'AdminUserEdit',
        component: () => import('../views/AdminUserEdit.vue')
      },
      {
        path: '/admin_users/edit/:id',
        name: 'AdminUserEditId',
        component: () => import('../views/AdminUserEdit.vue'),
        // 将props设置为true可以在页面中直接使用props，即该案例中的：id
        props: true
      },
      {
        path: '/admin_users/list',
        name: 'AdminUserList',
        component: () => import('../views/AdminUserList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
