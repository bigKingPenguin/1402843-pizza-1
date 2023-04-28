export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    getUserData(state, payload) {
      state.user = payload;
    },
    removeUserData(state) {
      state.user = null;
    },
  },
};
