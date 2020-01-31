import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
