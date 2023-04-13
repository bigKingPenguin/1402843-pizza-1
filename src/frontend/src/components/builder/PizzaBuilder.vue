<template>
  <div>
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughtSelector
          :pizzaDough="pizzaDough"
          @doughSelected="pizzaData.selectedDough = $event"
        />
        <BuilderSizeSelector
          :pizzaSizes="pizzaSizes"
          @sizeSelected="pizzaData.selectedSize = $event"
        />
        <BuilderIngredientsSelector
          :pizzaSauce="pizzaSauce"
          :pizzaFilling="pizzaFilling"
          @sauceSelected="pizzaData.selectedSauce = $event"
          @fillingSelected="addFilling"
        />

        <div class="content__pizza">
          <Input
            inputLabel="Название пиццы"
            isHiddenLabel
            inputName="pizza_name"
            inputPlaceholder="Введите название пиццы"
            isRequired
            @onInput="pizzaData.selectedPizzaName = $event"
          />
          <BuilderPizzaView
            :pizzaDough="pizzaData.selectedDough"
            :pizzaSauce="pizzaData.selectedSauce"
            :pizzaFilling="pizzaData.selectedFilling"
          />

          <div class="content__result">
            <BuilderPriceCounter :pizzaPrice="countPrice"/>
            <Button
              :class="{'button--disabled': !isReadyToCook}"
              :disabled="!isReadyToCook"
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

  export default {
    name: 'PizzaBuilder',
    components: {
      BuilderPriceCounter,
      Button, BuilderPizzaView, BuilderIngredientsSelector, BuilderSizeSelector, BuilderDoughtSelector, Input,
    },
    data() {
      return {
        pizzaDough: pizza.dough,
        pizzaSizes: pizza.sizes,
        pizzaSauce: pizza.sauces,
        pizzaFilling: pizza.ingredients,
        pizzaData: {
          selectedPizzaName: '',
          selectedDough: {},
          selectedSize: {},
          selectedSauce: {},
          selectedFilling: {},
        },
      };
    },
    computed: {
      isReadyToCook() {
        return Object.keys(this.pizzaData.selectedFilling).length && this.pizzaData.selectedPizzaName;
      },
      countPrice() {
        let pizzaPrice = 0;
        let fillingPrice = 0;
        for (let fil in this.pizzaData.selectedFilling) {
          fillingPrice += this.pizzaData.selectedFilling[fil].price * this.pizzaData.selectedFilling[fil].counter;
        }
        // мультипликатор размера х (стоимость теста + соус + ингредиенты)
        if (this.pizzaData.selectedDough.price || this.pizzaData.selectedSauce.price || fillingPrice > 0) {
          pizzaPrice = fillingPrice + (this.pizzaData.selectedDough?.price ?? 0) + (this.pizzaData.selectedSauce?.price ?? 0);
        }
        if (this.pizzaData.selectedSize?.multiplier) {
          pizzaPrice = pizzaPrice * this.pizzaData.selectedSize.multiplier;
        }
        return pizzaPrice;
      },
    },
    methods: {
      addFilling(filling) {
        if (filling.value in this.pizzaData.selectedFilling && filling.counter === 0) {
          delete this.pizzaData.selectedFilling[filling.value];
        } else {
          this.pizzaData.selectedFilling[filling.value] = filling;
        }
      },
    },
  };
</script>

<style scoped>

</style>
