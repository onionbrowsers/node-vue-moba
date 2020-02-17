const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 文章模式
const schema = new mongoose.Schema({
    // 文章标题
    title: {
        type: String
    },
    // 分类，隶属于新闻的哪个分类
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    body: {
        type: String
    }
}, {
    // 时间戳，返回两个时间，第一个是创建时间，第二个是修改时间
    timestamps: true
})

module.exports = mongoose.model('Article', schema)