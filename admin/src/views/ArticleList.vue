<template>
    <div>
        <h1>文章列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='230'></el-table-column>
            <el-table-column prop="parent.name" label="上级分类">
                <template slot-scope="scope">
                    <el-tag style="margin-right: 0.5rem" v-for="item in scope.row.categories" :key="item._id">{{item.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: []
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('articles')
                this.items = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定删除文章“${row.title}”?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`articles/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch()
                }).catch(err => {
                    console.log(err)
                })
            },
            handleClick(row) {
                console.log(row);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>