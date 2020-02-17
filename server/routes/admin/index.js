module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const User = require('../../models/AdminUser')
    // 三个参数，第一个用来判断是否有第一个参数，第二个返回http状态码，第三个是返回错误信息
    const assert = require('http-assert')
    const router = express.Router()

    const authMiddleware = require('../../middleware/auth')

    const Category = require('../../models/Category')

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
        // 按树形结构返回
        if (req.Model.modelName === 'Category') {
            let items = await req.Model.find().populate([
                {path: 'children'}
            ]).lean()
            items = items.filter(item => !item.parent)
            return res.send(items)
        } else if (req.Model.modelName === 'Article') {
            queryOptions.populate = 'categories'
        } else if (req.Model.modelName === 'Hero') {
            queryOptions.populate = 'categories'
        } else {
            queryOptions = {}
        }
        // 如果get传参了，并且是article，就返回他的子菜单，heros也是如此
        if (req.query.list) {
            let items
            switch (req.query.list) {
                case 'article':
                    items = await req.Model.findOne({
                        name: '新闻资讯'
                    }).populate({
                        path: 'children'
                    }).lean()
                    break
                case 'heros':
                    items = await req.Model.findOne({
                        name: '英雄'
                    }).populate({
                        path: 'children'
                    }).lean()
                    break
            }
            return res.send(items.children)
        }
        // 获取分类并且将其父级分类对象形式返回限制50条
        const items = await req.Model.find().setOptions(queryOptions).limit(200)
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
        // 删除时先判断是否和其他数据有关联
        if (req.Model.modelName === 'Category') {
            // populate数组写法，就可以将两个虚拟属性都填充进去,
            // lean方法是返回原始js数据，如果是返回的mongoose的document的话，无法查询出虚拟属性
            // 也无法使用js方法添加属性
            const cats = await req.Model.findById(req.params.id).populate([
                {path: 'children'},
                {path: 'newsList'},
                {path: 'heroList'}
            ]).lean()
            console.log(cats)
            if (cats.newsList.length > 0 || cats.children.length > 0 || cats.heroList.length > 0) {
                return res.send({
                    success: false,
                    message: '该分类有关联，无法删除'
                })
            }
        }
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: null
        })
    })

    // 通用CRUD写法
    app.use('/admin/rest/:resource', authMiddleware(), async (req, res, next) => {
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
    app.post('/admin/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/login', async (req, res) => {
        const {username, password} = req.body
        // 1. 根据用户名找用户
        // 因为密码是不可选取的所以想要选择密码就需要前面加上+
        const user = await User.findOne({username}).select('+password')
        assert(user, 422, '该用户不存在')
        // if (!user) {
        //     // 用户不存在的返回
        //     return res.status(422).send({
        //         message: '该用户不存在'
        //     })
        // }
        // 2. 校验密码
        // 根据使用的bcrypt的包比较用户账号密码是否配对的上
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     // 用户密码错误的返回
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3. 返回token
        // jsonwebtoken设置token的值
        // 自定义设置把什么东西加在token中
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, app.get('secret'), {
            // 过期时间可以写数字代表秒数，也可以写字符串，例如：'1min', '2 days', '10h', '7d'
            expiresIn: '24h'
        })
        res.send({
            token,
            username: user.username,
            message: '登录成功'
        })
    })
    
    // 全局错误处理函数
    app.use(async (err, req, res, next) => {
        // token过期返回的error message，改写一下
        if (err.message === 'jwt expired') {
            return res.status(401).send({
                message: 'token失效，请重新登录'
            })
        }
        res.status(err.status || 500).send({
            message: err.message
        })
    })
}