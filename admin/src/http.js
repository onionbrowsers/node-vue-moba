import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

// 设置axios的前缀url
const http = axios.create({
    // 端口后面的设置根据route中的设置一样即可
    baseURL: 'http://localhost:3000/admin/rest'
})

// 添加请求拦截器，每次请求接口前将token带给后端
http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加接口请求拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    // 如果报错了，将报错信息展示出来
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message)
    }
    // 401代表没有该用户
    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http