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

// 虚拟属性
schema.virtual('children', {
    // 本地键
    localField: '_id',
    // 外键
    foreignField: 'parent',
    // 是否只取一个
    justOne: false,
    // 关联表名称
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

schema.virtual('heroList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Hero'
})

module.exports = mongoose.model('Category', schema)