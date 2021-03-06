import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      isAuthenticated: false
    },
    productsView: {
      hasSubcategory: false
    },
    loadingScreen: {
      isLoading: false
    }
  },
  getters: {
    getUserId: state => {
      return state.user.id;
    },
    getAuthentication: state => {
      return state.user.isAuthenticated;
    },
    getSubcategory: state => {
      return state.productsView.hasSubcategory;
    },
    getLoadingStatus: state => {
      return state.loadingScreen.isLoading;
    }
  },
  mutations: {
    setUserId(state, id) {
      state.user.id = id;
    },
    setAuthentication(state, isAuthenticated) {
      state.user.isAuthenticated = isAuthenticated;
    },
    setSubcategory(state, hasSubcategory) {
      state.productsView.hasSubcategory = hasSubcategory; 
    },
    setLoadingStatus(state, isLoading) {
      state.loadingScreen.isLoading = isLoading;
    }
  },
  actions: {},
  modules: {}
});
