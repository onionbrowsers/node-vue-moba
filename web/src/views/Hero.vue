<template>
    <div class="hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/img/logo.png" height="30">
            <div class="px-2 flex-1 text-white">
                <span>王者荣耀</span>
                <span class="ml-2">攻略战</span>
            </div>
            <router-link to="/" tag="div" class="text-white">更多英雄 ></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                required: true
            }
        },
        data() {
            return {
                model: null
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`heros/${this.id}`)
                this.model = res.data
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .topbar
        position sticky
        top 0
        z-index 9999
</style>