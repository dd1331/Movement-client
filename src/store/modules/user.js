import VUE_APP_SERVER_HOST from '@/../env-config';

export default {
  namespaced: true,
  state: () => ({
    appUser: null,
    profile: null,
  }),
  mutations: {
    SET_USER(state, user) {
      state.appUser = user;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    async loginWithNaver({ commit }, id) {
      const { data } = await this.$axios.post(`${VUE_APP_SERVER_HOST}/auth/naver`, {
        id,
      });
      commit('SET_USER', data);
    },
    async fetchProfile({ commit }, id) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/users/profile/${id}`);
      commit('SET_PROFILE', data);
    },
  },
  getters: {
    getAppUser(state) {
      return state.appUser;
    },
    getProfile(state) {
      return state.profile;
    },
  },
};
