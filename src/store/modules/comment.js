import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    activeComments: [],
  }),
  mutations: {
    setActiveComments(state, payload) {
      state.activeComments = payload;
    },
    updateLikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.targetId);
      target.likes = payload.data;
    },
    updateDislikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.targetId);
      target.likes = payload.data;
    },
    setChildComments(state, payload) {
      const parentComment = state.activeComments.find((comment) => comment.id === payload.id);
      parentComment.child = payload.childComments;
      parentComment.childCount = parentComment.child.length;
    },
  },
  actions: {
    async fetchActiveComments({ commit }, id) {
      const { data } = await axios.get(`http://localhost:3000/comments/post/${id}`);
      commit('setActiveComments', data);
    },
    async likeComment({ commit }, payload) {
      const { data } = await axios.post('http://localhost:3000/comments/like', payload);
      commit('updateLikeCount', { targetId: payload.targetId, data });
      return data;
    },
    async dislikeComment({ commit }, payload) {
      const { data } = await axios.post('http://localhost:3000/comments/dislike', payload);
      commit('updateDislikeCount', { targetId: payload.targetId, data });
      return data;
    },
    async createComment({ dispatch }, payload) {
      await axios.post('http://localhost:3000/comments/create', payload);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', payload.postId, { root: true });
    },
    async createChildComment({ dispatch }, payload) {
      await axios.post('http://localhost:3000/comments/create-child', payload.comment);
      dispatch('fetchChildComment', payload.comment.parentId);
      // TODO mutate only comments in post object ?
    },

    async fetchChildComment({ commit }, id) {
      // TODO set it in vuex store ?
      const { data } = await axios.get(`http://localhost:3000/comments/fetch-children/${id}`);
      commit('setChildComments', { childComments: data, id });
      return data;
    },
    async deleteComment({ dispatch }, payload) {
      const { commentId, postId } = payload;
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', postId, { root: true });
    },
    async deleteChildComment({ dispatch }, payload) {
      const { commentId } = payload;
      const { data } = await axios.delete(`http://localhost:3000/comments/child/${commentId}`);
      dispatch('fetchChildComment', data.parentId);
    },
  },
  getters: {
    getActiveComments(state) {
      return state.activeComments;
    },
  },
};
