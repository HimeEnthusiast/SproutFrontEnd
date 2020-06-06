import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      isAuthenticated: false
    }
  },
  getters: {
    getUserId: state => {
      return state.user.id;
    },
    getAuthentication: state => {
      return state.user.isAuthenticated;
    }
  },
  mutations: {
    setUserId(state, id) {
      state.user.id = id;
    },
    setAuthentication(state, isAuthenticated) {
      state.user.isAuthenticated = isAuthenticated;
    }
  },
  actions: {},
  modules: {}
});
