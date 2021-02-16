import axios from 'axios';

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
    async loginWithNaver({ commit }, id) {
      const { data } = await axios.post('http://localhost:3000/auth/naver', {
        id,
      });
      commit('SET_USER', data);
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
