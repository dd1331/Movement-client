import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    appUser: null,
  }),
  mutations: {
    setUser(state, user) {
      state.appUser = user;
    },
  },
  actions: {
    async loginWithNaver({ commit }, id) {
      const { data } = await axios.post('http://192.168.35.237:3000/auth/naver', {
        id,
      });
      commit('setUser', data);
    },
  },
  getters: {
    getAppUser(state) {
      console.log('tes');
      return state.appUser;
    },
  },
};
