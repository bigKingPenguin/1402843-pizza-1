<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <!--    TODO: в pizza.json временно добавлен value для sauces-->
    <Radio
      v-for="sauce in pizzaSauce"
      :key="sauce.id"
      class="ingridients__input"
      name="sauce"
      :data="sauce"
      :isChecked="sauce.value === store.state.builder.selectedSauce.value"
      @itemSelected="store.commit(SET_SAUCE, $event)"
    />
  </div>
</template>

<script>

  import Radio from '@/common/input/Radio.vue';
  import {useStore} from 'vuex';
  import {SET_SAUCE} from '@/store/modules/builder-mutation-types';

  export default {
    name: 'BuilderIngredientsSauce',
    components: {Radio},
    props: {
      pizzaSauce: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      return {
        store,
        SET_SAUCE,
      };
    },
  };
</script>

<style scoped>

</style>
