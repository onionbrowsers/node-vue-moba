const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 分类模式
const schema = new mongoose.Schema({
    // 两个字段，第一个是名称，第二个是关联父级名称
    name: {
        type: String
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Category', schema)