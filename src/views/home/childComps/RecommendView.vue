<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, i) in recommends" :key="i">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .recommend{
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0 10px 0;
      border-bottom: 10px solid #eee;
      .recommend-item{
          flex: 1;
          img{
              width: 70px;
              height: 70px;
              margin-bottom: 10px;
          }
      }
  }
</style>
