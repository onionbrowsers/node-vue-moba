const express = require('express')

const app = express()

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

app.listen(3000, () => {
    console.log('启动成功')
})