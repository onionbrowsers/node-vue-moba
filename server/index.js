const express = require('express')

const app = express()

// 解决跨域
app.use(require('cors')())
// 解析body
app.use(express.json())

// 获取数据库
require('./plugins/db')(app)
// 获取路由
require('./routes/admin/index')(app)

app.listen(3000, () => {
    console.log('启动成功')
})