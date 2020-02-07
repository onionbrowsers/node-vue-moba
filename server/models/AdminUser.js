const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 管理员模式
const schema = new mongoose.Schema({
    // 账号
    username: {
        type: String
    },
    // 密码
    password: {
        type: String,
        // 调用接口获取用户时，不展示密码，密码为不可取
        select: false,
        // 自定义设置客户端传来的数据进行加密
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)