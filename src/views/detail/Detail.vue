<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 属性topImage，传入值top-image -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailImagesInfo from "./childComps/DetailImagesInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "@/components/common/scroll/Scroll"
import GoodsList from "@/components/content/goods/GoodsList"

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from "@/network/detail";
import { debounce } from "@/common/utils";
import { itemListenerMixin, backTopMixin } from "@/common/mixin"

// 将vuex actions中的函数映射到这里
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: ''
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.iid = this.$route.params.iid;
    // 请求详情数据
    getDetail(this.iid).then(res => {
      // 获取顶部图片轮播图
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 获取详细图片信息
      this.detailInfo = data.detailInfo
      // 获取参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      // 取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
      // nextTick 是等待页面中的数据渲染完之后，再回调后面的函数
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的dom是已经被渲染出来了
      //   // 但是图片依然是没有加载完的，目前获取到的offsetTop是不包含图片的
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
    });
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    // 监听图片加载
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    // 点击头部标签跳转到对应区域
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    // 页面滚动触发函数
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY与主题中值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) { 
        parseInt(i)
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 3. 是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000 ? true : false;
    },
    // 添加到购物车
    addToCart() {
      // 1.获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2.将商品添加到购物车里,用到vuex
      // diapatch 其实是一个promise
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      // 这其实是vuex中的函数，是映射过来的
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
      // 3.添加到购物车成功
    }
  }
};
</script>

<style lang="less" scoped>
#detail{
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 2;
    background-color: #fff;
}
.content{
  height: calc(100% - 44px);
  background-color: #fff;
}
</style>
