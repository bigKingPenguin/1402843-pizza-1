<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите ингридиенты
      </h2>

      <div class="sheet__content ingridients">
        <BuilderIngredientsSauce :pizzaSauce="pizzaSauce"/>
        <div class="ingridients__filling">
          <p>Начинка:</p>

          <BuilderIngredientsFilling :pizzaFilling="pizzaFilling"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BuilderIngredientsSauce
    from '@/components/builder/components/builderIngredients/BuilderIngredientsSauce.vue';
  import BuilderIngredientsFilling
    from '@/components/builder/components/builderIngredients/BuilderIngredientsFilling.vue';

  export default {
    name: 'BuilderIngredients',
    components: {BuilderIngredientsFilling, BuilderIngredientsSauce},
    props: {
      pizzaSauce: {
        type: Array,
        required: true,
      },
      pizzaFilling: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
