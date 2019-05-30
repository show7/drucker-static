import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const handleStore = store => { // 初始化时调用
  // replaceState 替换根实例的内容，这里比如要用replaceState 如果直接 = 会报错
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))

  store.subscribe((mutation, state) => { // 每次调用mutations时调用
    localStorage.setItem('state', JSON.stringify(state))
  })
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [handleStore]
})
