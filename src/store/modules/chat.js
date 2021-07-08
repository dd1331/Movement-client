export default {
  namespaced: true,
  state: () => ({
    rooms: [],
  }),
  mutations: {
    ADD_ROOM(state, room) {
      state.rooms.push(room);
    },
  },
  actions: {
    addRoom({ commit }, payload) {
      commit('ADD_ROOM', payload);
    },
  },
  getters: {},
};
