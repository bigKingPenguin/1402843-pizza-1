export default {
  namespaced: true,
  state: () => ({
    selectedPizzas: {
      // "avfrgtgregs":{"name":"avfrgtgregs","consist":{"dough":{"id":1,"name":"Тонкое","value":"light","image":"/public/img/dough-light.svg","description":"Из твердых сортов пшеницы","price":300},"size":{"id":2,"value":"normal","name":"32 см","image":"/public/img/diameter.svg","multiplier":2},"sauce":{"id":1,"name":"Томатный","value":"tomato","price":50},"filling":{"salami":{"id":3,"name":"Салями","value":"salami","image":"/public/img/filling/salami.svg","price":42,"counter":1},"onion":{"id":7,"name":"Лук","value":"onion","image":"/public/img/filling/onion.svg","price":21,"counter":1}}},"price":826,"quantity":1},
      // "fvffv":{"name":"fvffv","consist":{"dough":{"id":1,"name":"Тонкое","value":"light","image":"/public/img/dough-light.svg","description":"Из твердых сортов пшеницы","price":300},"size":{"id":2,"value":"normal","name":"32 см","image":"/public/img/diameter.svg","multiplier":2},"sauce":{"id":1,"name":"Томатный","value":"tomato","price":50},"filling":{"salami":{"id":3,"name":"Салями","value":"salami","image":"/public/img/filling/salami.svg","price":42,"counter":1},"onion":{"id":7,"name":"Лук","value":"onion","image":"/public/img/filling/onion.svg","price":21,"counter":1}}},"price":826,"quantity":1},

    },
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
