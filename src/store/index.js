import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isRoomAdmin: false
  },
  mutations: {
    setRoomAdmin(state, bool) {
      state.isRoomAdmin = bool;
    }
  },
  actions: {
    setRoomAdmin(context, bool) {
      context.commit('setRoomAdmin', bool);
    }
  },
  getters: {
    isRoomAdmin(){
      return state.isRoomAdmin;
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
