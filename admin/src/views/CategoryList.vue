<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="items" row-key='_id'>
            <el-table-column prop="_id" label="ID" width='300'></el-table-column>
            <el-table-column prop="parent.name" label="上级分类"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
                const res = await this.$http.get('categories')
                this.items = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定删除分类“${row.name}”?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`categories/${row._id}`)
                    // 新增判断条件，根据后端返回的success是否为true判断
                    if (!res.data.success) {
                        return this.$message({
                            type: 'error',
                            message: res.data.message
                        })
                    }
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