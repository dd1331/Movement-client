export default {
  namespaced: true,
  state: () => ({
    rooms: [],
    activeRoom: null,
  }),
  mutations: {
    ADD_ROOM(state, room) {
      state.rooms.push(room);
    },
    SET_ACTIVE_ROOM(state, room) {
      state.activeRoom = room;
    },
  },
  actions: {
    addRoom({ commit }, payload) {
      commit('ADD_ROOM', payload);
    },
    setActiveRoom({ commit }, payload) {
      commit('SET_ACTIVE_ROOM', payload);
    },
  },
  getters: {
    getActiveRoom(state) {
      return state.activeRoom;
    },
  },
};
