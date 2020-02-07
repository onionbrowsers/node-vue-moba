const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 广告位模式
const schema = new mongoose.Schema({
    // 广告标题
    name: {
        type: String
    },
    // 广告数量
    items: [{
        image: {
            type: String
        },
        url: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Ad', schema)