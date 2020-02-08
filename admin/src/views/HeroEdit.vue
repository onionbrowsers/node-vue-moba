<template>
    <div>
        <el-button type='text' v-show="this.id" @click="$router.push('/heros/list')">返回</el-button>
        <h1>{{id ? '编辑' : '新建'}}英雄</h1>
        <el-form :model="model" ref="goodsForm" label-width='120px' @submit.native.prevent="save">
            <el-tabs type='border-card' value='basic'>
                <el-tab-pane label='基础信息' name='basic'>
                    <el-form-item label='名称'>
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label='称号'>
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label='头像'>
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl + '/upload'"
                            :headers='getAuthHeaders()'
                            :show-file-list="false"
                            :on-success="afterUpload">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label='类型'>
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="item of categories"
                                :key="item._id"
                                :label='item.name'
                                :value='item._id'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='难度'>
                        <el-rate :max='9' style="margin-top:0.7rem" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label='技能'>
                        <el-rate :max='9' style="margin-top:0.7rem" show-score v-model="model.scores.skill"></el-rate>
                    </el-form-item>
                    <el-form-item label='攻击'>
                        <el-rate :max='9' style="margin-top:0.7rem" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label='生存'>
                        <el-rate :max='9' style="margin-top:0.7rem" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label='顺风出装'>
                        <el-select v-model="model.items1" multiple>
                            <el-option
                                v-for="item of items"
                                :key="item._id"
                                :label='item.name'
                                :value='item._id'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='使用技巧'>
                        <el-input type='textarea' v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label='对抗技巧'>
                        <el-input type='textarea' v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label='团战思路'>
                        <el-input type='textarea' v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label='技能' name='skill'>
                    <el-button type='text' @click="model.skills.push({})" icon='el-icon-plus' :style="{visibility: model.skills.length > 3 ? 'hidden' : 'visible'}">添加技能</el-button>
                    <el-row type='flex' style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
                            <el-form-item label='名称'>
                                <el-input v-model='item.name'></el-input>
                            </el-form-item>
                            <el-form-item label='图标'>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'icon', res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label='描述'>
                                <el-input v-model="item.description" type='textarea' :autosize='{minRows: 3}'></el-input>
                            </el-form-item>
                            <el-form-item label='小提示'>
                                <el-input v-model="item.tips" type='textarea' :autosize='{minRows: 3}'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size='small' type='danger' @click="model.skills.splice(index, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 1rem" class="el-test">
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
                    scores: {},
                    skills: []
                },
                categories: [],
                items: []
            }
        },
        created() {
            this.uploadUrl = this.$http.defaults.baseURL.replace('/rest', '')
            this.id && this.fetch()
            this.fetchCategories()
            this.fetchItems()
        },
        // 当新建英雄的时候将原来获取的表单数据清空
        watch: {
            id(val) {
                if (!val) {
                    this.model = {
                        scores: {},
                        skills: []
                    }
                }
            }
        },
        methods: {
            afterUpload(res) {
                this.$set(this.model, 'avatar', res.url)
            },
            // async await写法
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put('heros/' + this.id, this.model)
                } else {
                    res = await this.$http.post('heros', this.model)
                }
                console.log(res)
                this.$router.push('/heros/list')
                this.$message.success('保存成功')
            },
            async fetch() {
                const res = await this.$http.get('heros/' + this.id)
                this.model = Object.assign(this.model, res.data)
            },
            // 获取分类菜单的下拉数据
            async fetchCategories() {
                const res = await this.$http.get('categories/')
                this.categories = res.data
            },
            // 获取所有物品的下拉数据
            async fetchItems() {
                const res = await this.$http.get('items/')
                this.items = res.data
            },
        },
    }
</script>