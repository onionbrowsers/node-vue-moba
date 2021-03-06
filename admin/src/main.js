import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
// 引入css
import './assets/css/upload.css'
import './assets/css/reset.css'

import http from './http'

Vue.config.productionTip = false

// 挂载到vue原型上
Vue.prototype.$http = http

// 全局添加mixin，给upload组件的请求头上添加token
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return localStorage.token ? {
        Authorization: `Bearer ${localStorage.token}`
      } : {}
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
