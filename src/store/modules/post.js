import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const { data } = await axios.get('http://192.168.35.237:3000/posts');
      commit('setPosts', data.slice(0, 20));
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
};
