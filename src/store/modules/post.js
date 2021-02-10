import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    acivePost: null,
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setActivePost(state, post) {
      state.acivePost = post;
    },
  },
  actions: {
    async fetchAllPosts({ commit }) {
      const { data } = await axios.get('http://localhost:3000/posts');
      commit('setPosts', data.slice(0, 20));
    },
    async fetchPost({ commit }, id) {
      // const { data } = await axios.get('http://localhost:3000/posts', { id });
      const { data } = await axios.get(`http://localhost:3000/posts/${id}`);
      commit('setActivePost', data);
    },
    async creataPost(_, post) {
      await axios.post('http://localhost:3000/posts/create', post);
    },
    async updatePost(_, post) {
      const { data } = await axios.patch('http://localhost:3000/posts', post);
      console.log(data);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getActivePost(state) {
      return state.acivePost;
    },
  },
};
