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
        @quantitySelected="$emit('fillingSelected', $event)"
      />
    </li>
  </ul>
</template>

<script>

  import ItemCounter from '@/common/input/ItemCounter.vue';

  export default {
    name: 'BuilderIngredientsFilling',
    components: {ItemCounter},
    props: {
      pizzaFilling: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
