// 链接mongodb数据库
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // require-all代表把参数文件夹内的所有文件引用一遍，防止没引用模型的情况下无法使用
    require('require-all')(__dirname + '/../models')
}