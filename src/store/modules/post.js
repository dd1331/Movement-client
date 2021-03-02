import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    recommendedPosts: [],
    popularPosts: [],
    recentPosts: [],
    activePost: null,
    activelikes: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setRecommendedPosts(state, posts) {
      state.recommendedPosts = posts;
    },
    setPopularPosts(state, posts) {
      state.popularPosts = posts;
    },
    setRecentPosts(state, posts) {
      state.recentPosts = posts;
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
      const { data } = await axios.get('http://localhost:3000/posts/readAll');
      commit('setPosts', data.slice(0, 20));
    },
    async fetchCategorizedPosts({ commit }, payload) {
      const { data } = await axios.get(`http://localhost:3000/posts/readAll/${payload.title}`);
      commit('setPosts', data.slice(0, 20));
    },
    async fetchPost({ commit }, postId) {
      const { data } = await axios.get(`http://localhost:3000/posts/${postId}`);
      commit('setActivePost', data);
    },
    async fetchRecommendedPost({ commit }) {
      const { data } = await axios.get('http://localhost:3000/posts/recommended');
      commit('setRecommendedPosts', data);
    },
    async fetchPopularPosts({ commit }) {
      const { data } = await axios.get('http://localhost:3000/posts/popular');
      commit('setPopularPosts', data);
    },
    async fetchRecentPosts({ commit }) {
      const { data } = await axios.get('http://localhost:3000/posts/recent');
      commit('setRecentPosts', data);
    },
    async createPost(_, payload) {
      const { data } = await axios.post('http://localhost:3000/posts/create', payload);
      return data;
    },
    async updatePost(_, post) {
      const { data } = await axios.patch('http://localhost:3000/posts', post);
      return data;
    },
    async removePost({ dispatch }, payload) {
      try {
        // TODO replace temperal return value
        const res = payload.id;
        // const res = await axios.delete(`http://localhost:3000/posts/${id}`);
        dispatch('fetchCategorizedPosts', { title: payload.category });
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
      console.log(updatedPost);
      commit('setActiveLikes', updatedPost.data);
      return updatedPost;
    },
  },
  getters: {
    getPosts(state) {
      console.log('ts', state);
      return state.posts;
    },
    getRecommendedPost(state) {
      return state.recommendedPosts;
    },
    getPopularPosts(state) {
      return state.popularPosts;
    },
    getRecentPosts(state) {
      return state.recentPosts;
    },
    getActivePost(state) {
      return state.activePost;
    },
  },
};
