export default {
  namespaced: true,
  state: () => ({
    showLoginModal: false,
    showOrderSubmitPopup: false,
  }),
  mutations: {
    toggleLoginModal(state, payload) {
      state.showLoginModal = payload;
    },
    toggleOrderSubmitPopup(state, payload) {
      state.showOrderSubmitPopup = payload;
    },
  },
};
