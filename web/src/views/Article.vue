<template>
    <div v-if="model" class="article">
        <div class="d-flex py-3 px-2 border-bottom text-blue">
            <i @click="$router.push('/')" class="iconfont icon-back fs-sm mr-1 fs-xl"></i>
            <div style="font-weight:600" class="news-title fs-lg">{{model.title}}</div>
            <div class="text-grey fs-sm flex-1 text-right mr-2">{{model.createdAt}}</div>
        </div>
        <div v-html="model.body" class="px-3 body fs-xl"></div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        props: {
            id: {
                required: true
            }
        },
        created() {
            this.fetchData()
        },
        data() {
            return {
                model: null
            }
        },
        methods: {
            async fetchData() {
                const res = await this.$http.get(`/articles/${this.id}`)
                this.model = res.data
                this.model.createdAt = dayjs(this.model.createdAt).format('YYYY-MM-DD')
            }
        },
    }
</script>

<style lang="stylus">
.article
    .news-title
        white-space nowrap
        text-overflow ellipsis
        width 280px
        overflow hidden
    .body
        .ql-align-center, p
            text-align center
            img
                max-width 100%
                height auto
        .ql-video
            max-width 100%
            height 200px
</style>