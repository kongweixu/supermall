<template>
  <swiper class="swiper-content">
    <swiper-item v-for="(item, i) in topImages" :key="i">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-content {
  height: 300px;
  overflow: hidden;
}
</style>
