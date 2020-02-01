import axios from 'axios'

// 设置axios的前缀url
const http = axios.create({
    // 端口后面的设置根据route中的设置一样即可
    baseURL: 'http://localhost:3000/admin/rest'
})

export default http