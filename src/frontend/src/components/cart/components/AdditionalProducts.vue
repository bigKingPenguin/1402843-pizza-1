<template>
  <div class="cart__additional">
    <ul
      class="additional-list"
      v-if="Object.keys(selectedPizza).length"
    >
      <li
        class="additional-list__item sheet"
        v-for="add in additionalProducts"
        :key="add.id"
      >
        <AdditionalItem :itemData="add"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import AdditionalItem from '@/components/cart/components/additionalProducts/AdditionalItem.vue';
  import {useStore} from 'vuex';
  import {computed} from 'vue';

  export default {
    name: 'AdditionalProducts',
    components: {AdditionalItem},
    props: {
      additionalProducts: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    setup() {
      const store = useStore();

      const selectedPizza = computed(() => store.state.cart.selectedPizzas);

      return {
        selectedPizza,
      };
    },
  };
</script>

<style scoped>

</style>
