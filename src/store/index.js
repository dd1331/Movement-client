import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import post from './modules/post';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    post,
  },
});

export default store;
