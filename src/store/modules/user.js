import axios from 'axios';

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
      const { data } = await axios.post('http://localhost:3000/auth/naver', {
        id,
      });
      commit('SET_USER', data);
    },
  },
  getters: {
    getAppUser(state) {
      console.log('tes');
      return state.appUser;
    },
  },
};
