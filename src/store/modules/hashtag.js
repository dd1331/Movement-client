import VUE_APP_SERVER_HOST from '@/../env-config';

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
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/hashtags/popular`);
      commit('setPopularHashtags', data);
    },
  },
  getters: {
    getPopularHashtags(state) {
      return state.popularHashtags;
    },
  },
};
