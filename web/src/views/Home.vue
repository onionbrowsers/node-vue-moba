<template>
	<div class="home">
		<swiper ref="mySwiper" :options="swiperOption">
			<!-- slides -->
			<swiper-slide>
				<img class="w-100" src="../assets/img/swiper1.jpeg" alt />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/img/swiper2.jpeg" alt />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/img/swiper3.jpeg" alt />
			</swiper-slide>
			<div
				class="swiper-pagination pagi-home pr-3"
				slot="pagination"
			></div>
		</swiper>
		<!-- end of swiper -->
		<div class="nav-icons bg-white mt-3 text-dark-1 text-center">
			<div
				class="d-flex flex-wrap collapse-transition"
				:class="{ 'change-height': !openLock }"
			>
				<div
					class="nav-item my-2"
					v-for="(item, n) in iconData"
					:key="n"
					:class="{ br: (n + 1) % 4 !== 0 }"
				>
					<i class="sprite" :class="[item.icon]"></i>
					<div class="fs-md mt-1">{{ item.name }}</div>
				</div>
			</div>
			<div
				class="bg-light py-2 fs-sm"
				style="cursor: pointer"
				@click="changeIcon"
			>
				<i
					class="sprite sprite-arrow"
					:class="{ 'rotate-arrow': !openLock }"
				></i>
				<span class="ml-1">{{ openLock ? "收起" : "展开" }}</span>
			</div>
		</div>
		<!-- end of nav icons -->
		<!-- <div class="card p-3 bg-white mt-3">
			<div class="card-header pb-3 d-flex">
				<i class="iconfont icon-menu mr-1"></i>
				<div class="fs-xl flex-1">新闻资讯</div>
				<i class="iconfont icon-ellipsis"></i>
			</div>
			<div class="card-body pt-3">
				<div class="nav d-flex jc-between">
					<div class="nav-item active">
						<div class="nav-link">热门</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">新闻</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">公告</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">活动</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">赛事</div>
					</div>
				</div>
				<div class="pt-3">
					<swiper>
						<swiper-slide v-for="n in 5" :key="n">
							<div
								class="py-2 d-flex fs-xl"
								v-for="n in 5"
								:key="n"
							>
								<span style="color:#999">[新闻]</span>
								<span class="mx-1">|</span>
								<span class="flex-1">标题</span>
								<span>06/02</span>
							</div>
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div> -->
		<list-card icon="icon-menu" title="新闻资讯" :categories="categories">
			<!-- #是v-slot缩写，category是list-card中定义的变量 -->
			<template #item="{category}">
				<div
					class="py-2 d-flex fs-lg"
					v-for="(news, i) in category.newsList"
					:key="i"
				>
					<span style="color:#999">[{{ news.categoryName }}]</span>
					<span class="mx-2">|</span>
					<span class="flex-1 text-dark news-title">{{ news.title }}</span>
					<span class="text-grey">{{ news.createdAt | date }}</span>
				</div>
			</template>
		</list-card>
		<list-card icon="icon-heros" title="英雄列表" :categories="heroCats">
			<!-- #是v-slot缩写，category是list-card中定义的变量 -->
			<template #item="{category}">
				<div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
					<div
						class="p-2 text-center"
						v-for="(hero, i) in category.heroList"
						:key="i"
						style="width: 20%"
					>
						<img :src="hero.avatar" class="w-100" alt="">
						<div>{{hero.name}}</div>
					</div>
				</div>
			</template>
		</list-card>
		<!-- <card icon="icon-heros" title="英雄列表"> </card>
		<card icon="icon-book" title="图文列表"> </card>
		<card icon="icon-video" title="精彩视频"> </card> -->
	</div>
</template>

<script>
import ListCard from "../components/ListCard";
import dayjs from 'dayjs'
export default {
	filters: {
		date(val) {
			return dayjs(val).format('MM/DD')
		}
	},
	components: {
		ListCard
	},
	data() {
		return {
			swiperOption: {
				pagination: {
					el: ".pagi-home"
				},
				autoplay: true,
				loop: true
			},
			iconData: [
				{
					name: "爆料站",
					icon: "sprite-news"
				},
				{
					name: "故事站",
					icon: "sprite-stories"
				},
				{
					name: "周边商城",
					icon: "sprite-shop"
				},
				{
					name: "体验服",
					icon: "sprite-enjoy"
				},
				{
					name: "新人专区",
					icon: "sprite-person"
				},
				{
					name: "荣耀传承",
					icon: "sprite-honor"
				},
				{
					name: "模拟战资料库",
					icon: "sprite-resource"
				},
				{
					name: "王者营地",
					icon: "sprite-base"
				}
			],
			openLock: true,
			categories: [],
			heroCats: []
		};
	},
	created() {
		this.fetchNewsCats()
		this.fetchHeroCats()
	},
	methods: {
		// 获取新闻接口
		async fetchNewsCats() {
			const res = await this.$http.get('news/list')
			this.categories = res.data
		},
		// 获取英雄接口
		async fetchHeroCats() {
			const res = await this.$http.get('heros/list')
			this.heroCats = res.data
		},
		// 改变展开收起和图标效果
		changeIcon() {
			this.openLock = !this.openLock;
		}
	}
};
</script>

<style lang="stylus">
@import '../assets/css/variable.styl'
.home
	.pagi-home
		text-align: right;
		.swiper-pagination-bullet
			background-color: #ffffff;
			opacity: 1;
			border-radius: 2px;
			&.swiper-pagination-bullet-active
				background-color: #4b67af;
	.nav-icons
		border-bottom 1px solid $border-color
		border-top 1px solid $border-color
		.collapse-transition
			transition all 0.2s linear
			overflow hidden
			height 135px
		&.change-height
			height: calc(135px / 2)
		.nav-item
			width: 25%
		.rotate-arrow
			transform rotate(180deg)
	.nav-item
		border-bottom 3px solid transparent
		&.active
			border-bottom 0.2308rem solid $font-primary
			padding-bottom 0.2308rem
			color: $font-primary
	.news-title
		white-space nowrap
		text-overflow ellipsis
		overflow hidden
</style>
