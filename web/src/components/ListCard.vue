<template>
    <!-- 高级带有头部导航的卡片组件 -->
	<div class="card p-3 bg-white mt-3">
		<div class="card-header pb-3 d-flex">
			<i class="iconfont mr-1" :class="icon"></i>
			<div class="fs-xl flex-1">{{ title }}</div>
			<i class="iconfont icon-ellipsis"></i>
		</div>
		<div class="card-body pt-3">
			<div class="nav d-flex jc-between">
				<div
					class="nav-item"
					:class="{ active: i === active }"
					@click="$refs.cardSwiper.swiper.slideTo(i)"
					v-for="(category, i) in categories"
					:key="i"
				>
					<div class="nav-link">{{ category.name }}</div>
				</div>
			</div>
			<div class="pt-3">
				<swiper ref="cardSwiper" :options='swiperOptions'>
					<swiper-slide v-for="(category, i) in categories" :key="i">
                        <!-- 具名插槽，用来使用子组件内的作用域和变量，用什么用v-bind抛出什么 -->
						<slot name="item" :category='category'></slot>
					</swiper-slide>
				</swiper>
			</div>
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
		},
		categories: {
			type: Array,
			required: true
		}
    },
	data() {
		return {
            active: 0,
            // swiper5配置
            swiperOptions: {
				// 自适应高度
				autoHeight: true,
                on: {
                    slideChangeTransitionEnd: () => {
                        this.active = this.swiper.activeIndex
                    }
                }
            }
		};
    },
    computed: {
        // 将cardSwiper要用到的swiper直接抽离出来
        swiper() {
            return this.$refs.cardSwiper.swiper
        }
    },
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/variable.styl'
    .card
        border-bottom 1px solid $border-color
        .card-header
            border-bottom 1px solid $border-color
</style>
