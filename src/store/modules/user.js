import SERVER_HOST from '@/../env-config';

export default {
  namespaced: true,
  state: () => ({
    appUser: null,
  }),
  mutations: {
    SET_USER(state, user) {
      state.appUser = user;
    },
  },
  actions: {
    async loginWithNaver({ commit }, id) {
      const { data } = await this.$axios.post(`${SERVER_HOST}/auth/naver`, {
        id,
      });
      commit('SET_USER', data);
    },
  },
  getters: {
    getAppUser(state) {
      return state.appUser;
    },
  },
};
