import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  // 修改任何state中的东西都要用到mutation
  state,
  // mutations 唯一的目的就是修改state中状态
  // mutations 中的每个方法完成的事件比较单一
  mutations,
  actions,
  getters
})

// 3.挂载到vue实例上
export default store
