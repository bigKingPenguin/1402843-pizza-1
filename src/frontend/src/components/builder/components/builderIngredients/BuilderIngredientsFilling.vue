<template>
  <ul class="ingridients__list">
    <li
      class="ingridients__item"
      v-for="ingredient in pizzaFilling"
      :key="ingredient.id"
    >
      <!--      TODO: в pizza.json временно добавлен value для ingredients-->
      <IngredientItem :ingredient="ingredient"/>
    </li>
  </ul>
</template>

<script>
  import {useStore} from 'vuex';
  import IngredientItem from '@/components/builder/components/builderIngredients/IngredientItem.vue';

  export default {
    name: 'BuilderIngredientsFilling',
    components: {IngredientItem},
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
      };
    },
  };
</script>

<style scoped>

</style>
