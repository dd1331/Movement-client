import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
  }),
  mutations: {
  },
  actions: {
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
    async createComment({ dispatch }, payload) {
      await axios.post('http://localhost:3000/comments', payload);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', payload.postId, { root: true });
    },
    async deleteComment({ dispatch }, payload) {
      const { commentId, postId } = payload;
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', postId, { root: true });
    },
  },
  getters: {
  },
};
