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
      const res = await this.$axios.get('http://localhost:3000/common/categories/board');
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
