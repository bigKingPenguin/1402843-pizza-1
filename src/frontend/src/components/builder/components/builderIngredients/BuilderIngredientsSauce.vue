<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <!--  TODO: указать дефолтные значения для v-model-->
    <!--    TODO: в pizza.json временно добавлен value для sauces-->
    <Radio
      v-for="sauce in pizzaSauce"
      :key="sauce.id"
      class="ingridients__input"
      name="sauce"
      :data="sauce"
      @itemSelected="$emit('sauceSelected', $event)"
    />
  </div>
</template>

<script>

  import Radio from '@/common/input/Radio.vue';

  export default {
    name: 'BuilderIngredientsSauce',
    components: {Radio},
    props: {
      pizzaSauce: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
