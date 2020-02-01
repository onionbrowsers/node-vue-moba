<template>
    <div>
        <el-button type='text' v-show="this.id" @click="$router.push('/items/list')">返回</el-button>
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form :model="model" ref="goodsForm" label-width='120px' @submit.native.prevent="save">
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='图标'>
                <el-input v-model="model.icon"></el-input>
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
            }
        },
        created() {
            this.id && this.fetch()
        },
        // 当新建物品的时候将原来获取的表单数据清空
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
                    res = await this.$http.put('items/' + this.id, this.model)
                } else {
                    res = await this.$http.post('items', this.model)
                }
                console.log(res)
                this.$router.push('/items/list')
                this.$message.success('保存成功')
            },
            async fetch() {
                const res = await this.$http.get('items/' + this.id)
                this.model = res.data
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>