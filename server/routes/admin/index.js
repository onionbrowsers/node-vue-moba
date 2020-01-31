module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require('../../models/Category')

    // 新建分类
    router.post('/categories', async (req, res) => {
        if (!req.body.name) {
            return res.send({
                success: false,
                message: '名称必须填写',
                status: 200
            })
        }
        const model = await Category.create(req.body)
        res.send(model)
    })
    // 获取分类
    router.get('/categories', async (req, res) => {
        // 获取分类并且将其父级分类对象形式返回限制10条
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    // 获取分类根据ObjectId
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    // 根据Id获取分类名称并且修改
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 根据Id获取分类名称并且删除
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: null
        })
    })

    app.use('/admin', router)
}