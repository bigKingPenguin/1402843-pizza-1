<template>
  <ul class="ingridients__list">
    <li
      class="ingridients__item"
      v-for="ingredient in pizzaFilling"
      :key="ingredient.id"
    >
      <!--      TODO: в pizza.json временно добавлен value для ingredients-->
      <ItemCounter
        :data="ingredient"
        counterType="ingridients"
        itemType="filling"
        itemDraggable
        :itemMaximumCount="3"
        @quantitySelected="store.commit(ADD_FILLING, $event)"
      />
    </li>
  </ul>
</template>

<script>

  import ItemCounter from '@/common/input/ItemCounter.vue';
  import {useStore} from 'vuex';
  import {ADD_FILLING} from '@/store/mutation-types';

  export default {
    name: 'BuilderIngredientsFilling',
    components: {ItemCounter},
    props: {
      pizzaFilling: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      return {
        store,
        ADD_FILLING,
      };
    },
  };
</script>

<style scoped>

</style>
