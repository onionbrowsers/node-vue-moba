<template>
    <div>
        <!-- 文章页面 -->
        <el-button type='text' v-show="this.id" @click="$router.push('/articles/list')">返回</el-button>
        <h1>{{id ? '编辑' : '新建'}}列表</h1>
        <el-form ref="categoriesForm" :model='model' label-width='120px' @submit.native.prevent="save">
            <el-form-item label='所属分类'>
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label='item.name'
                        :value='item._id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='标题'>
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label='详情'>
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import axios from 'axios'
    export default {
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        components: {
            VueEditor
        },
        data() {
            return {
                model: {},
                categories: []
            }
        },
        created() {
            this.fetchCategories()
            this.id  && this.fetch()
            // 脑瘫了只能继续脑瘫
            axios.interceptors.request.use(config => {
                if (localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + localStorage.token
                }
                return config
            }, error => {
                return Promise.reject(error)
            })
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
                if (this.id) {
                    res = await this.$http.put('articles/' + this.id, this.model)
                } else {
                    res = await this.$http.post('articles', this.model)
                }
                console.log(res)
                this.$router.push('/articles/list')
                this.$message.success('保存成功')
            },
            async fetch() {
                const res = await this.$http.get('articles/' + this.id)
                this.model = res.data
            },
            // 获取上级菜单，用于下拉框
            async fetchCategories() {
                const res = await this.$http.get('categories/')
                this.categories = res.data
            },
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                let formData = new FormData();
                formData.append("file", file);

                const url = this.$http.defaults.baseURL.replace('/rest', '') + '/upload'
                const res = await axios.post(url, formData)
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            }
        },
    }
</script>