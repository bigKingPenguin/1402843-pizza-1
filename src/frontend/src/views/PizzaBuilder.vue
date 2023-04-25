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
            :inputValue="inputValue"
            isHiddenLabel
            inputName="pizza_name"
            inputPlaceholder="Введите название пиццы"
            isRequired
            @update:onInput="store.commit(SET_NAME, $event)"
          />
          <BuilderPizzaView/>

          <div class="content__result">
            <BuilderPriceCounter/>
            <Button
              :class="{'button--disabled': !isReadyToCook}"
              :disabled="!isReadyToCook"
              buttonClass="button"
              buttonText="Готовьте!"
              @click="addToCart"
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
  import {computed, onMounted, ref} from 'vue';
  import {useStore} from 'vuex';
  import {SET_DOUGH, SET_NAME, SET_SAUCE, SET_SIZE} from '@/store/modules/builder-mutation-types';
  import {COUNT_PRICE, IS_READY_TO_COOK} from '@/store/modules/builder-getter-types';

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

      const setDefaultConsist = () => {
        store.commit(SET_DOUGH, pizzaDough.value.find((el) => el.value === 'light'));
        store.commit(SET_SIZE, pizzaSizes.value.find((el) => el.value === 'normal'));
        store.commit(SET_SAUCE, pizzaSauce.value.find((el) => el.value === 'tomato'));
      };

      onMounted(() => setDefaultConsist());

      const countPrice = computed(() => store.getters[COUNT_PRICE]);

      const addToCart = () => {
        store.commit('cart/addPizza', {
          name: store.state.builder.selectedPizzaName,
          consist: {
            dough: store.state.builder.selectedDough,
            size: store.state.builder.selectedSize,
            sauce: store.state.builder.selectedSauce,
            filling: store.state.builder.selectedFilling,
          },
          price: countPrice.value,
          quantity: 1,
        });
        store.commit('builder/resetBuilder');
        setDefaultConsist();
      };

      return {
        store,
        pizzaDough,
        pizzaSizes,
        pizzaSauce,
        pizzaFilling,
        SET_NAME,
        isReadyToCook: computed(() => store.getters[IS_READY_TO_COOK]),
        inputValue: computed(() => store.state.builder.selectedPizzaName),
        countPrice,
        addToCart,
      };
    },
  };
</script>

<style scoped>

</style>
