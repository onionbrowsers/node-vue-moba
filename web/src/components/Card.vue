<template>
    <!-- 普通卡片组件 -->
	<div class="card p-3 bg-white mt-3">
		<div class="card-header pb-3 d-flex">
			<i class="iconfont mr-1" :class="icon"></i>
			<div class="fs-xl flex-1">{{ title }}</div>
			<i class="iconfont icon-ellipsis"></i>
		</div>
		<div class="card-body pt-3">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			required: true
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="stylus">
@import '../assets/css/variable.styl'
    .card
        border-bottom 1px solid $border-color
        .card-header
            border-bottom 1px solid $border-color
</style>
