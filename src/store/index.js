import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import auth from './modules/auth';
import post from './modules/post';
import comment from './modules/comment';
import common from './modules/common';

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
    auth,
    comment,
    common,
  },
});

export default store;
