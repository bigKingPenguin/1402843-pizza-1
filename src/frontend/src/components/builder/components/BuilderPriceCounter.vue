<template>
  <p>Итого: {{ pizzaPrice }} ₽</p>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';
  import {COUNT_PRICE} from '@/store/modules/builder-getter-types';

  export default {
    name: 'BuilderPriceCounter',
    setup() {
      const store = useStore();

      return {
        pizzaPrice: computed(() => store.getters[COUNT_PRICE]),
      };
    },
  };

</script>

<style scoped>

</style>
