export default {
  namespaced: true,
  state: () => ({
    selectedPizzaName: '',
    selectedDough: {},
    selectedSize: {},
    selectedSauce: {},
    selectedFilling: {},
  }),
  getters: {
    isReadyToCook(state) {
      return Object.keys(state.selectedFilling).length && state.selectedPizzaName;
    },
    countPrice(state) {
      let pizzaPrice = 0;
      let fillingPrice = 0;
      for (let fil in state.selectedFilling) {
        fillingPrice += state.selectedFilling[fil].price * state.selectedFilling[fil].counter;
      }
      // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      pizzaPrice = fillingPrice + (state.selectedDough?.price ?? 0) + (state.selectedSauce?.price ?? 0);
      if (state.selectedSize?.multiplier) {
        pizzaPrice = pizzaPrice * state.selectedSize.multiplier;
      }
      return pizzaPrice;
    },
  },
  mutations: {
    setPizzaName(state, payload) {
      state.selectedPizzaName = payload;
    },
    setPizzaDough(state, payload) {
      state.selectedDough = payload;
    },
    setPizzaSize(state, payload) {
      state.selectedSize = payload;
    },
    setPizzaSauce(state, payload) {
      state.selectedSauce = payload;
    },
    addFilling(state, payload) {
      if (payload.value in state.selectedFilling && payload.counter === 0) {
        delete state.selectedFilling[payload.value];
      } else {
        state.selectedFilling[payload.value] = payload;
      }
    },
  },
  actions: {},
};
