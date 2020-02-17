<template>
    <div>
        <el-button type='text' v-show="this.id" @click="$router.push('/categories/list')">返回</el-button>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form ref="categoriesForm" :model='model' label-width='120px' @submit.native.prevent="save">
            <el-form-item label='上级分类'>
                <el-select v-model="model.parent">
                    <el-option
                        v-for="item in parents"
                        :key="item._id"
                        :label='item.name'
                        :value='item._id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                model: {},
                parents: []
            }
        },
        created() {
            this.fetchParents()
            this.id  && this.fetch()
        },
        // 当新建分类的时候将原来获取的表单数据清空
        watch: {
            id(val) {
                if (!val) {
                    this.model = {}
                }
            }
        },
        methods: {
            // async await写法
            async save() {
                let res
                if (!this.model.parent) {
                    delete this.model.parent
                }
                if (this.id) {
                    res = await this.$http.put('categories/' + this.id, this.model)
                } else {
                    res = await this.$http.post('categories', this.model)
                }
                console.log(res)
                this.$router.push('/categories/list')
                this.$message.success('保存成功')
            },
            async fetch() {
                const res = await this.$http.get('categories/' + this.id)
                this.model = res.data
            },
            // 获取上级菜单，用于下拉框
            async fetchParents() {
                const res = await this.$http.get('categories/')
                // 本意是该分类无上级分类，有待改进
                let arr = [{
                    name: '无',
                    _id: 0
                }]
                this.parents = arr.concat(res.data)
            },
        },
    }
</script>