import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    activePost: null,
    activelikes: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setActivePost(state, post) {
      state.activePost = post;
    },
    setActiveLikes(state, likes) {
      state.activePost.likes = likes;
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
      return data;
    },
    async removePost(_, id) {
      try {
        // TODO replace temperal return value
        const res = id;
        // const res = await axios.delete(`http://localhost:3000/posts/${id}`);
        console.log(res);
        return res;
      } catch (error) {
        return error;
      }
    },
    async likePost({ commit }, payload) {
      const updatedPost = await axios.post('http://localhost:3000/posts/like', payload);
      commit('setActiveLikes', updatedPost.data);
      return updatedPost;
    },
    async dislikePost({ commit }, payload) {
      const updatedPost = await axios.post('http://localhost:3000/posts/dislike', payload);
      commit('setActiveLikes', updatedPost.data);
      return updatedPost;
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getActivePost(state) {
      return state.activePost;
    },
  },
};
