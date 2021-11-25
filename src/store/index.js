import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isRoomAdmin: false,
    user: {},
    isAuthenticated: false,
    currentChatUser:{}
  },
  mutations: {
    setRoomAdmin(state, bool) {
      state.isRoomAdmin = bool;
    },
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
      // console.log(state.user, state.isAuthenticated);
    },
    removeUser(state) {
      state.isAuthenticated = false;
      state.user = {};
      // console.log('removed user')
    },
    setCurrentChatUser(state, user) {
      state.currentChatUser = user;
      // console.log(state.currentChatUser);
    },
  },
  actions: {
    setRoomAdmin(context, bool) {
      context.commit('setRoomAdmin', bool);
    },
    setUser(context, user) {
      context.commit('setUser', user);
    },
    removeUser(context) {
      context.commit('removeUser');
    },
    setCurrentChatUser(context, user) {
      context.commit('setCurrentChatUser', user);
    },
  },
  getters: {
    isRoomAdmin(state) {
      return state.isRoomAdmin;
    },
    getUser(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    currentChatUser(state){
      return state.currentChatUser;
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
