import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    staffAcc: '',//这是用户存的cookie
  },
  mutations: {
    setStaffAcc(state,name) {
      return state.staffAcc = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
