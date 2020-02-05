<template>
    <div>
        <h1>英雄列表</h1>
        <el-table :data="heros">
            <el-table-column prop="_id" label="ID" width='230'></el-table-column>
            <el-table-column prop="name" label="英雄名称"></el-table-column>
            <el-table-column prop="title" label="英雄称号"></el-table-column>
            <el-table-column prop='avatar' label='头像'>
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height: 3rem">
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="$router.push(`/heros/edit/${scope.row._id}`)">编辑</el-button>
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
                heros: []
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('heros')
                this.heros = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定删除英雄“${row.name}”?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`heros/${row._id}`)
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