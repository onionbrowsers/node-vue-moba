const express = require('express')

const app = express()

// express的方法设置键值对在原型上，类似于map或者set
app.set('secret', 'wodediyigetoken')

// 解决跨域
app.use(require('cors')())
// 解析body
app.use(express.json())
// 开放静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

// 获取数据库
require('./plugins/db')(app)
// 获取路由
require('./routes/admin/index')(app)
// 获取移动端接口路由
require('./routes/web/index')(app)

app.listen(3000, () => {
    console.log('启动成功')
})