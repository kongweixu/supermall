<template>
  <div class="tab-control">
    <div
      v-for="(item, i) in titles"
      :key="i"
      :class="{ active: i === currentIndex }"
      class="tab-control-item"
      @click="itemClick(i)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 发出的外部事件
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  .tab-control-item {
    flex: 1;
    span {
      padding: 5px;
    }
  }
}
.active {
  color: var(--color-high-text);
  span {
    border-bottom: 2px solid var(--color-tint);
  }
}
</style>
