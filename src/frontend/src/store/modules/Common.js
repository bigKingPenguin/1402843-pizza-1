export default {
  namespaced: true,
  state: () => ({
    showLoginModal: false,
  }),
  mutations: {
    toggleLoginModal(state, payload) {
      state.showLoginModal = payload;
    },
  },
};
