<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll" 
        @click.native="checkClick"
      >
      </check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    // 合计总价
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0)
    },
    // “去计算”中
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    // 是否全部选中
    isSelectAll() {
      // if(this.$store.state.cartList.length === 0) return false
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    // 点击全选按钮功能
    checkClick() {
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    // 点击去计算，但是无选中商品的弹窗
    calcClick() {
      if (!this.isSelectAll) {}
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-bar {
  position: relative; 
  height: 40px;
  display: flex;
  background-color: #eee;
  line-height: 40px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
  font-size: 14px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 30px;
  font-size: 14px;
  flex: 1;
}
.calculate{
  width: 90px;
  background-color: red;
  text-align: center;
  font-size: 14px;
}
</style>
