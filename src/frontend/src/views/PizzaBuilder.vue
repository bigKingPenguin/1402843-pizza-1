<template>
  <div>
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughtSelector :pizzaDough="pizzaDough"/>
        <BuilderSizeSelector :pizzaSizes="pizzaSizes"/>
        <BuilderIngredientsSelector
          :pizzaSauce="pizzaSauce"
          :pizzaFilling="pizzaFilling"
        />

        <div class="content__pizza">
          <Input
            inputLabel="Название пиццы"
            isHiddenLabel
            inputName="pizza_name"
            inputPlaceholder="Введите название пиццы"
            isRequired
            @onInput="store.commit(SET_NAME, $event)"
          />
          <BuilderPizzaView/>

          <div class="content__result">
            <BuilderPriceCounter/>
            <Button
              :class="{'button--disabled': !isReadyToCook}"
              :disabled="!isReadyToCook"
              buttonText="Готовьте!"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import pizza from '@/static/pizza.json';
  import BuilderDoughtSelector from '@/components/builder/components/BuilderDoughtSelector.vue';
  import BuilderSizeSelector from '@/components/builder/components/BuilderSizeSelector.vue';
  import BuilderIngredientsSelector from '@/components/builder/components/BuilderIngredientsSelector.vue';
  import Input from '@/common/input/Input.vue';
  import BuilderPizzaView from '@/components/builder/components/BuilderPizzaView.vue';
  import Button from '@/common/button/Button.vue';
  import BuilderPriceCounter from '@/components/builder/components/BuilderPriceCounter.vue';
  import {computed, ref} from 'vue';
  import {useStore} from 'vuex';
  import {SET_NAME} from '@/store/mutation-types';
  import {COUNT_PRICE, IS_READY_TO_COOK} from '@/store/getter-types';

  export default {
    name: 'PizzaBuilder',
    components: {
      BuilderPriceCounter,
      Button, BuilderPizzaView, BuilderIngredientsSelector, BuilderSizeSelector, BuilderDoughtSelector, Input,
    },
    setup() {
      const store = useStore();

      const pizzaDough = ref(pizza.dough);
      const pizzaSizes = ref(pizza.sizes);
      const pizzaSauce = ref(pizza.sauces);
      const pizzaFilling = ref(pizza.ingredients);

      return {
        store,
        pizzaDough,
        pizzaSizes,
        pizzaSauce,
        pizzaFilling,
        SET_NAME,
        isReadyToCook: computed(() => store.getters[IS_READY_TO_COOK]),
        countPrice: computed(() => store.getters[COUNT_PRICE]),
      };
    },
  };
</script>

<style scoped>

</style>
