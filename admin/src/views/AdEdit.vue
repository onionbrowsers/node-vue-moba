<template>
    <div>
        <!-- 广告位页面 -->
        <el-button type='text' v-show="this.id" @click="$router.push('/ads/list')">返回</el-button>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form ref="categoriesForm" :model='model' label-width='120px' @submit.native.prevent="save">
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='广告'>
                <el-button
                    @click="model.items.push({})"
                    icon='el-icon-plus'
                    :style="{visibility: model.items.length > 3 ? 'hidden' : 'visible'}">
                    添加广告
                </el-button>
                <el-row type='flex' style="flex-wrap: wrap" class="ad-row" :gutter='50'>
                    <el-col :md="12" v-for="(item, index) in model.items" :key="index">
                        <el-form-item label='URL' label-width='50px'>
                            <el-input v-model='item.url'></el-input>
                        </el-form-item>
                        <el-form-item label='图片' label-width='50px'>
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl + '/upload'"
                                :show-file-list="false"
                                :on-success="res => $set(item, 'image', res.url)">
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size='small' type='danger' @click="model.items.splice(index, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                model: {
                    items: []
                },
                parents: []
            }
        },
        created() {
            this.uploadUrl = this.$http.defaults.baseURL.replace('/rest', '')
            this.id  && this.fetch()
        },
        // 当新建分类的时候将原来获取的表单数据清空
        watch: {
            id(val) {
                if (!val) {
                    this.model = {
                        items: []
                    }
                }
            }
        },
        methods: {
            // async await写法
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put('ads/' + this.id, this.model)
                } else {
                    res = await this.$http.post('ads', this.model)
                }
                console.log(res)
                this.$router.push('/ads/list')
                this.$message.success('保存成功')
            },
            async fetch() {
                const res = await this.$http.get('ads/' + this.id)
                this.model = Object.assign(this.model, res.data)
            }
        },
    }
</script>
<style lang="stylus">
    .ad-row
        margin-top 1rem
        .el-form-item
            margin-bottom 0.8rem
            .el-form-item__label
                text-align left
</style>