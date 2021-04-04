//

const getAppUser = () => JSON.parse(localStorage.getItem('appUser'));

export default {
  namespaced: true,
  state: () => ({
    appUser: getAppUser(),
  }),
  mutations: {
    SET_USER(state, user) {
      state.appUser = user;
      localStorage.setItem('appUser', JSON.stringify(user));
    },
    REMOVE_USER(state) {
      state.appUser = null;
      localStorage.removeItem('appUser');
    },
  },
  actions: {
    async loginWithNaver({ commit }, payload) {
      const { data } = await this.$axios.post('http://192.168.35.219:3000/auth/naver', { ...payload });
      commit('SET_USER', data);
      // TODO refactor
      this.$axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    },
    async logout({ commit }) {
      commit('REMOVE_USER');
    },
  },
  getters: {
    getAppUser(state) {
      return state.appUser;
    },
  },
};
