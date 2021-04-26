import VUE_APP_SERVER_HOST from '@/../env-config';

export default {
  namespaced: true,
  state: () => ({
    categories: [],
    currentCategory: {},
  }),
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    setCurrentCategory(state, payload) {
      state.currentCategory = payload;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      const res = await this.$axios.get(`${VUE_APP_SERVER_HOST}/common/categories/board`);
      commit('setCategories', res.data);
    },

  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCurrentCategory(state) {
      return state.currentCategory;
    },
  },
};
