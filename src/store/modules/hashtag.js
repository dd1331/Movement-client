export default {
  namespaced: true,
  state: () => ({
    popularHashtags: [],
  }),
  mutations: {
    setPopularHashtags(state, payload) {
      state.popularHashtags = payload;
    },
  },
  actions: {
    async fetchPopularHashtags({ commit }) {
      const { data } = await this.$axios.get('http://localhost:3000/hashtags/popular');
      console.log(data);
      commit('setPopularHashtags', data);
    },
  },
  getters: {
    getPopularHashtags(state) {
      return state.popularHashtags;
    },
  },
};
