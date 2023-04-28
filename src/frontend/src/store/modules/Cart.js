export default {
  namespaced: true,
  state: () => ({
    selectedPizzas: {},
    additionalProducts: {},
  }),
  getters: {
    calculateFinalCost(state) {
      let pizzaCost = 0;
      for (let pizza in state.selectedPizzas) {
        pizzaCost += (state.selectedPizzas[pizza].price * state.selectedPizzas[pizza].quantity);
      }
      let additionalCost = 0;
      for (let add in state.additionalProducts) {
        additionalCost += (state.additionalProducts[add].price * state.additionalProducts[add].quantity);
      }
      return pizzaCost + additionalCost;
    },
  },
  mutations: {
    addPizzasFromStorage(state, payload) {
      state.selectedPizzas = payload;
    },
    addPizza(state, payload) {
      state.selectedPizzas[payload.name] = payload;
    },
    changePizzaQuantity(state, payload) {
      state.selectedPizzas[payload.name].quantity = payload.quantity;
    },
    removePizza(state, payload) {
      delete state.selectedPizzas[payload];
    },
    addAdditionalProduct(state, payload) {
      if (payload.value in state.additionalProducts && payload.quantity === 0) {
        delete state.additionalProducts[payload.value];
      } else {
        state.additionalProducts[payload.value] = payload;
      }
    },
  },
};
