module.exports = options => {
    const jwt = require('jsonwebtoken')
    const User = require('../models/AdminUser')
    const assert = require('http-assert')
    
    // 登录授权中间件
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        // 将拿到的token和自己定义的secret相比较，拿到之前添加给token的对象
        const {id} = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
        // 判断数据库内是否有该ID
        req.user = await User.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}