import SERVER_HOST from '@/../env-config';

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
      const { data } = await this.$axios.get(`${SERVER_HOST}/hashtags/popular`);
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
