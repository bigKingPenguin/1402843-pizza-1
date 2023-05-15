<template>
  <ul class="cart-list sheet">
    <li
      v-for="pizza in selectedPizzas"
      :key="pizza.name"
      class="cart-list__item"
    >
      <PizzaItem :pizzaData="pizza"/>
    </li>
  </ul>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';
  import {DOUGH_DESCRIPTION} from '@/common/const/dictionary';
  import PizzaItem from '@/components/cart/components/assembledPizza/PizzaItem.vue';

  export default {
    name: 'AssembledPizza',
    components: {PizzaItem},
    setup() {
      const store = useStore();

      const selectedPizzas = computed(() => store.state.cart.selectedPizzas);

      return {
        selectedPizzas,
        DOUGH_DESCRIPTION,
      };
    },
  };
</script>

<style scoped>

</style>
