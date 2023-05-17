export default {
  namespaced: true,
  state: () => ({
    user: null,
    address: {},
    changingAddress: null,
  }),
  mutations: {
    getUserData(state, payload) {
      state.user = payload;
    },
    removeUserData(state) {
      state.user = null;
    },
    getUserAddress(state, payload) {
      state.address[payload.name] = payload;
    },
    clearAddresses(state) {
      state.address = {};
    },
    addChangingAddress(state, payload) {
      state.changingAddress = state.address[payload];
    },
    clearChangingAddress(state) {
      state.changingAddress = null;
    },
  },
};
