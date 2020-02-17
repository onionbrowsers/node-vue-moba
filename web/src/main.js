import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/css/reset.css'
import './assets/css/color.styl'
// iconfont字体
import './assets/iconfont/iconfont.css'

import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api/'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
