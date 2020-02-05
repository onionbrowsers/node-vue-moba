const mongoose = require('mongoose')


// 创建数据库的数据模式 Schema
// 英雄模式
const schema = new mongoose.Schema({
    // 名称
    name: {
        type: String
    },
    // 头像
    avatar: {
        type: String
    },
    // 称号
    title: {
        type: String
    },
    // 分类，隶属于英雄的哪个位置
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    // 得分
    scores: {
        difficult: {
            type: Number
        },
        skill: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        }
    },
    // 技能表
    skills: [{
        icon: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        }
    }],
    // 顺风出装
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 逆风出装
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips: {
        type: String
    },
    // 对战技巧
    battleTips: {
        type: String
    },
    // 团战思路
    teamTips: {
        type: String
    },
    // 最佳搭档
    pattners: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero'
        },
        description: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Hero', schema)