import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    categories: [],
  }),
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      const res = await axios.get('http://localhost:3000/common/categories/board');
      commit('setCategories', res.data);
      console.log(res.data);
    },

  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
};
