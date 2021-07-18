export default {
  namespaced: true,
  state: () => ({
    rooms: [],
    activeRoom: null,
    activeChat: null,
  }),
  mutations: {
    ADD_ROOM(state, room) {
      state.rooms.push(room);
    },
    SET_ACTIVE_ROOM(state, room) {
      state.activeRoom = room;
    },
    SET_ACTIVE_CHAT(state, chat) {
      state.activeChat = chat.reverse();
    },
    ADD_CHAT(state, chat) {
      state.activeChat.push(chat);
    },
  },
  actions: {
    addRoom({ commit }, payload) {
      commit('ADD_ROOM', payload);
    },
    setActiveRoom({ commit }, payload) {
      commit('SET_ACTIVE_ROOM', payload);
    },
    fetchChat({ commit }, payload) {
      commit('SET_ACTIVE_CHAT', payload);
    },
    addChat({ commit }, payload) {
      commit('ADD_CHAT', payload);
    },
  },
  getters: {
    getActiveRoom(state) {
      return state.activeRoom;
    },
    getActiveChat(state) {
      return state.activeChat;
    },
  },
};
