module.exports = app => {
    const express = require('express')
    const router = express.Router()

    // const Category = require('../../models/Category')

    // 新建分类
    router.post('/', async (req, res) => {
        // if (!req.body.name) {
        //     return res.send({
        //         success: false,
        //         message: '名称必须填写',
        //         status: 200
        //     })
        // }
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 获取分类
    router.get('/', async (req, res) => {
        // 因为不是所有的都有父级分类，所以改为条件选择
        let queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        } else if (req.Model.modelName === 'Article') {
            const Category = require('../../models/Category')
            queryOptions.populate = 'categories'
        } else {
            queryOptions = {}
        }
        // 获取分类并且将其父级分类对象形式返回限制10条
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    // 获取分类根据ObjectId
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 根据Id获取分类名称并且修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 根据Id获取分类名称并且删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: null
        })
    })

    // 通用CRUD写法
    app.use('/admin/rest/:resource', async (req, res, next) => {
        // 因为获取的是资源复数，想要获取对应的模式单数，引用inflection包
        const modelName = require('inflection').classify(req.params.resource)
        // 挂载到req上
        req.Model = require(`../../models/${modelName}`)
        // 继续执行express插件
        next()
    }, router)

    // 上传图片的接口编写
    const path = require('path')
    // express提供的上传图片的中间件
    const multer = require('multer')
    // 设置上传的图片保存的文件路径
    const upload = multer({dest: path.join(__dirname, '../../uploads')})
    // 接口编写，single是代表上传单张图片，也可.Array上传多张
    app.post('/admin/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/login', async (req, res) => {
        const {username, password} = req.body
        // 1. 根据用户名找用户
        const User = require('../../models/AdminUser')
        // 因为密码是不可选取的所以想要选择密码就需要前面加上+
        const user = await User.findOne({username}).select('+password')
        if (!user) {
            // 用户不存在的返回
            return res.status(422).send({
                message: '该用户不存在'
            })
        }
        // 2. 校验密码
        // 根据使用的bcrypt的包比较用户账号密码是否配对的上
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            // 用户密码错误的返回
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 3. 返回token
        // jsonwebtoken设置token的值
        const jwt = require('jsonwebtoken')
        // 自定义设置把什么东西加在token中
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, app.get('secret'))
        res.send({
            token,
            username: user.username,
            message: '登录成功'
        })
    })

}