import {DELIVERY_HIMSELF, DELIVERY_HOME, DELIVERY_NEW_ADDRESS} from '@/common/const/constants';

export default {
  namespaced: true,
  state: () => ({
    selectedPizzas: {},
    additionalProducts: {},
    delivery: {
      deliveryMethod: DELIVERY_HIMSELF,
      phone: null,
      street: null,
      building: null,
      flat: null,
      comment: null,
    },
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
    isReadyToOrder(state) {
      return !!((state.delivery.deliveryMethod === DELIVERY_HIMSELF && state.delivery.phone) || (state.delivery.deliveryMethod === DELIVERY_NEW_ADDRESS && state.delivery.phone && state.delivery.street && state.delivery.building) || (state.delivery.deliveryMethod === DELIVERY_HOME && state.delivery.phone && state.delivery.street && state.delivery.building));
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
    removeAdditionalProducts(state) {
      state.additionalProducts = {};
    },
    changeDeliveryMethod(state, payload) {
      state.delivery.deliveryMethod = payload;
    },
    getPhoneNumber(state, payload) {
      state.delivery.phone = payload;
    },
    getStreetData(state, payload) {
      state.delivery.street = payload;
    },
    getBuildingData(state, payload) {
      state.delivery.building = payload;
    },
    getFlatData(state, payload) {
      state.delivery.flat = payload;
    },
    getComment(state, payload) {
      state.delivery.comment = payload;
    },
    clearAddress(state) {
      state.delivery.street = null;
      state.delivery.building = null;
      state.delivery.flat = null;
    },
  },
};
