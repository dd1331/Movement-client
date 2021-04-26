import SERVER_HOST from '@/../env-config';

export default {
  namespaced: true,
  state: () => ({
    activeComments: [],
  }),
  mutations: {
    setActiveComments(state, payload) {
      state.activeComments = payload.map((comment) => ({ ...comment, isOpen: false }));
    },
    updateLikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.targetId);
      target.likes = payload.data;
    },
    // TODO merge like/dislike
    updateChildLikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.parentId);
      const childComment = target.child.find((comment) => comment.id === payload.targetId);
      childComment.likes = payload.data;
    },
    updateDislikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.targetId);
      target.likes = payload.data;
    },
    updateChildDislikeCount(state, payload) {
      const target = state.activeComments.find((comment) => comment.id === payload.parentId);
      const childComment = target.child.find((comment) => comment.id === payload.targetId);
      childComment.likes = payload.data;
    },
    setChildComments(state, payload) {
      const parentComment = state.activeComments.find((comment) => comment.id === payload.id);
      parentComment.child = payload.childComments;
      parentComment.childCount = parentComment.child.length;
    },
    setIsOpen(state, parentId) {
      const parentComment = state.activeComments.find((comment) => comment.id === parentId);
      parentComment.isOpen = !parentComment.isOpen;
    },
  },
  actions: {
    async fetchActiveComments({ commit }, id) {
      const { data } = await this.$axios.get(`${SERVER_HOST}/comments/post/${id}`);
      commit('setActiveComments', data);
    },
    async likeComment({ commit }, payload) {
      const { data } = await this.$axios.post(`${SERVER_HOST}/comments/like`, payload.data);
      if (data[0]?.type === 'childComment') {
        commit('updateChildLikeCount', { targetId: payload.data.targetId, data, parentId: payload.parentId });
        return data;
      }
      commit('updateLikeCount', { targetId: payload.data.targetId, data });
      return data;
    },
    async dislikeComment({ commit }, payload) {
      const { data } = await this.$axios.post(`${SERVER_HOST}/comments/dislike`, payload.data);
      if (data[0]?.type === 'childComment') {
        commit('updateChildDislikeCount', { targetId: payload.data.targetId, data, parentId: payload.parentId });
        return data;
      }
      commit('updateDislikeCount', { targetId: payload.data.targetId, data });
      return data;
    },
    async createComment({ dispatch }, payload) {
      await this.$axios.post(`${SERVER_HOST}/comments/create`, payload);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', payload.postId, { root: true });
    },
    async createChildComment({ dispatch }, payload) {
      await this.$axios.post(`${SERVER_HOST}/comments/create-child`, payload.comment);
      dispatch('fetchChildComment', payload.comment.parentId);
      // TODO mutate only comments in post object ?
    },

    async fetchChildComment({ commit }, id) {
      // TODO set it in vuex store ?
      const { data } = await this.$axios.get(`${SERVER_HOST}/comments/fetch-children/${id}`);
      commit('setChildComments', { childComments: data, id });
      return data;
    },
    async deleteComment({ dispatch }, payload) {
      const { commentId, postId } = payload;
      await this.$axios.delete(`${SERVER_HOST}/comments/${commentId}`);
      // TODO mutate only comments in post object ?
      dispatch('post/fetchPost', postId, { root: true });
    },
    async deleteChildComment({ dispatch }, payload) {
      const { commentId } = payload;
      const { data } = await this.$axios.delete(`${SERVER_HOST}/comments/child/${commentId}`);
      dispatch('fetchChildComment', data.parentId);
    },
  },
  getters: {
    getActiveComments(state) {
      return state.activeComments;
    },
  },
};
