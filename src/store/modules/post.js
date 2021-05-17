import VUE_APP_SERVER_HOST from '@/../env-config';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    recommendedPosts: [],
    popularPosts: [],
    recentPosts: [],
    emphasizedPosts: [],
    activePost: null,
    activelikes: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    accumulatePosts(state, posts) {
      state.posts = [...state.posts, ...posts];
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
    setEmphasizedPosts(state, posts) {
      state.emphasizedPosts = posts;
    },
    setActivePost(state, post) {
      state.activePost = post;
    },
    setActiveLikes(state, likes) {
      state.activePost.likes = likes;
    },
    // setChildComments(state, payload) {
    //   // TODO REMOVE
    //   const parentComment = state.activePost.comments.
    // find((comment) => comment.id === payload.id);
    //   parentComment.child = payload.childComments;
    //   parentComment.childCount = parentComment.child.length;
    // },
  },
  actions: {
    async fetchAllPosts({ commit }) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts`);
      commit('setPosts', data.slice(0, 20));
    },
    async fetchCategorizedPosts({ commit }, payload) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts`, { params: payload });
      commit('setPosts', data);
    },
    async fetchPost({ commit, dispatch }, postId) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts/${postId}`);
      commit('setActivePost', data);
      dispatch('comment/fetchActiveComments', postId, { root: true });
    },
    async fetchRecommendedPost({ commit }) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts/recommended`);
      commit('setRecommendedPosts', data);
    },
    async fetchPopularPosts({ commit }) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts/popular`);
      commit('setPopularPosts', data);
    },
    async fetchRecentPosts({ commit }) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts/recent`);
      commit('setRecentPosts', data);
    },
    async fetchEmphasizedPosts({ commit }, payload) {
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/posts/emphasized`, { params: payload });
      commit('setEmphasizedPosts', data);
    },
    async createPost(_, payload) {
      const { data } = await this.$axios.post(`${VUE_APP_SERVER_HOST}/posts/create`, payload);
      return data;
    },
    async updatePost(_, post) {
      const { data } = await this.$axios.patch(`${VUE_APP_SERVER_HOST}/posts`, post);
      return data;
    },
    async removePost({ dispatch }, payload) {
      try {
        // TODO replace temperal return value
        const res = payload.id;
        // const res = await this.$axios.delete(`${VUE_APP_SERVER_HOST}/posts/${payload.id}`);
        dispatch('fetchCategorizedPosts', { title: payload.category });
        return res;
      } catch (error) {
        return error;
      }
    },
    async likePost({ commit }, payload) {
      const updatedPost = await this.$axios.post(`${VUE_APP_SERVER_HOST}/posts/like`, payload);
      commit('setActiveLikes', updatedPost.data);
      return updatedPost;
    },
    async dislikePost({ commit }, payload) {
      const updatedPost = await this.$axios.post(`${VUE_APP_SERVER_HOST}/posts/dislike`, payload);
      commit('setActiveLikes', updatedPost.data);
      return updatedPost;
    },
  },
  getters: {
    getPosts(state) {
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
    getEmphasizedPosts(state) {
      return state.emphasizedPosts;
    },
    getActivePost(state) {
      return state.activePost;
    },
  },
};
