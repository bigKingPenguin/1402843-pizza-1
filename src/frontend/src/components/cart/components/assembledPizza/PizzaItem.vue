<template>
  <div class="product cart-list__product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizzaData.name">
    <div class="product__text">
      <h2>{{ pizzaData.name }}</h2>
      <ul>
        <li>{{ pizzaData.consist.size.name }}, {{ DOUGH_DESCRIPTION[pizzaData.consist.dough.value] }}</li>
        <li>Соус: {{ pizzaData.consist.sauce.name.toLowerCase() }}</li>
        <li>Начинка: {{ getFillingList() }}</li>
      </ul>
    </div>
  </div>

  <ItemCounter
    :defaultCounter="pizzaData.quantity"
    :itemMinimumCount="CART_PIZZA_MINIMUM_COUNT"
    counterButtonColor="orange"
    counterType="cart-list"
    @counterPlus="onCounterChange(counter + 1)"
    @counterMinus="onCounterChange(counter - 1)"
  />

  <div class="cart-list__price">
    <b>{{ pizzaCost }} ₽</b>
  </div>

  <Button
    buttonText="x"
    buttonClass="button--cross"
    aria-label="Удалить"
    @click="removePizza"
  />

  <Button
    buttonClass="cart-list__edit"
    buttonText="Изменить"
    @click="editSelectedPizza"
  />
</template>

<script>
  import {DOUGH_DESCRIPTION} from '@/common/const/dictionary';
  import {CART_PIZZA_MINIMUM_COUNT, PIZZA, ROUTE_MAIN} from '@/common/const/constants';
  import ItemCounter from '@/common/input/ItemCounter.vue';
  import {useStore} from 'vuex';
  import {computed, ref} from 'vue';
  import Button from '@/common/button/Button.vue';
  import {useRouter} from 'vue-router';
  import {getStorageData, removeStorageData, saveDataInStorage} from '@/plugins/localStorage.service';

  export default {
    name: 'PizzaItem',
    components: {Button, ItemCounter},
    props: {
      pizzaData: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
      const router = useRouter();

      const selectedPizzas = computed(() => store.state.cart.selectedPizzas);
      const additionalProducts = computed(() => store.state.cart.additionalProducts);

      const getFillingList = () => {
        let acc = [];

        for (let fil in props.pizzaData.consist.filling) {
          acc.push(props.pizzaData.consist.filling[fil].name.toLowerCase());
        }
        return acc.join(', ');
      };

      const counter = computed(() => selectedPizzas.value[props.pizzaData.name]?.quantity ?? CART_PIZZA_MINIMUM_COUNT);

      const pizzaPrice = ref(props.pizzaData.price);
      const pizzaCost = computed(() => pizzaPrice.value * selectedPizzas.value[props.pizzaData.name].quantity);

      const onCounterChange = (event) => {
        store.commit('cart/changePizzaQuantity', {name: props.pizzaData.name, quantity: event});
        if (counter.value > 0) {
          saveDataInStorage(PIZZA, JSON.stringify(selectedPizzas.value));
        } else {
          removeStorageData(props.pizzaData.name);
        }
      };

      const removePizza = () => {
        store.commit('cart/removePizza', props.pizzaData.name);
        saveDataInStorage('pizza', JSON.stringify(selectedPizzas.value));
        if (!Object.keys(selectedPizzas.value).length) {
          for (let add in additionalProducts.value) {
            if (getStorageData(`additional_${add}`)) {
              removeStorageData(`additional_${add}`);
            }
          }
          store.commit('cart/removeAdditionalProducts');
        }
      };

      const editSelectedPizza = () => {
        store.commit('builder/toggleEditState');
        router.push(ROUTE_MAIN);
        store.commit('builder/editSelectedPizza', {
          name: props.pizzaData.name,
          editedName: props.pizzaData.name,
          dough: props.pizzaData.consist.dough,
          size: props.pizzaData.consist.size,
          sauce: props.pizzaData.consist.sauce,
          filling: props.pizzaData.consist.filling,
        });
      };

      return {
        store,
        counter,
        pizzaCost,
        DOUGH_DESCRIPTION,
        CART_PIZZA_MINIMUM_COUNT,
        getFillingList,
        onCounterChange,
        removePizza,
        editSelectedPizza,
      };
    },
  };
</script>

<style scoped>

</style>
