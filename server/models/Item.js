const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 物品模式
const schema = new mongoose.Schema({
    // 两个字段，第一个是名称，第二个是物品图标
    name: {
        type: String
    },
    icon: {
        type: String
    }
})

module.exports = mongoose.model('Item', schema)