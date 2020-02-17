<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/img/logo.png" height="30">
            <div class="px-2 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type='button' class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary py-2 fs-md">
            <div class="nav d-flex text-white jc-around">
                <div class="nav-item py-1 active">
                    <router-link class="nav-link" tag="div" to='/'>首页</router-link>
                </div>
                <div class="nav-item py-1">
                    <router-link class="nav-link" tag="div" to='/'>攻略中心</router-link>
                </div>
                <div class="nav-item py-1">
                    <router-link class="nav-link" tag="div" to='/'>赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="stylus" scoped>
    .topbar
        position sticky
        top 0
        z-index 9999
    .nav
        .nav-item
            border-bottom 3px solid transparent
        .active
            border-bottom 3px solid #fff
</style>