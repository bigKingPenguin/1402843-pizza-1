const setupState = () => ({
  selectedPizzaName: '',
  selectedDough: {},
  selectedSize: {},
  selectedSauce: {},
  selectedFilling: {},
});

export default {
  namespaced: true,
  state: () => ({
    selectedPizzaName: '',
    editedPizzaName: '',
    selectedDough: {},
    selectedSize: {},
    selectedSauce: {},
    selectedFilling: {},
    isEdit: false,
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
    resetBuilder(state) {
      Object.assign(state, setupState());
    },
    editSelectedPizza(state, payload) {
      state.editedPizzaName = payload.editedName;
      state.selectedPizzaName = payload.name;
      state.selectedDough = payload.dough;
      state.selectedSize = payload.size;
      state.selectedSauce = payload.sauce;
      state.selectedFilling = payload.filling;
    },
    toggleEditState(state) {
      state.isEdit = !state.isEdit;
    },
  },
  actions: {},
};
