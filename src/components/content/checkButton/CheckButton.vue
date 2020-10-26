<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="@/assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.check-button {
  border-radius: 40%;
  border: 2px solid #aaa;
}
.check {
  background-color: red;
}
</style>
