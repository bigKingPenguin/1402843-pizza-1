<template>
  <div>
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughtSelector
          :pizzaDough="pizzaDough"
          @doughSelected="selectedDough = $event"
        />
        <BuilderSizeSelector
          :pizzaSizes="pizzaSizes"
          @sizeSelected="selectedSize = $event"
        />
        <BuilderIngredientsSelector
          :pizzaSauce="pizzaSauce"
          :pizzaFilling="pizzaFilling"
          @sauceSelected="selectedSauce = $event"
          @fillingSelected="selectedFilling[$event.value] = $event"
        />

        <div class="content__pizza">
          <Input
            inputLabel="Название пиццы"
            isHiddenLabel
            inputName="pizza_name"
            inputPlaceholder="Введите название пиццы"
            isRequired
            @onInput="selectedPizzaName = $event"
          />
          <BuilderPizzaView
            :pizzaDough="selectedDough"
            :pizzaSauce="selectedSauce"
            :pizzaFilling="selectedFilling"
          />

          <div class="content__result">
            <BuilderPriceCounter :pizzaPrice="pizzaPrice"/>
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
        selectedPizzaName: '',
        selectedDough: {},
        selectedSize: {},
        selectedSauce: {},
        selectedFilling: {
          mushrooms: {},
          cheddar: {},
          salami: {},
          ham: {},
          ananas: {},
          bacon: {},
          onion: {},
          chile: {},
          jalapeno: {},
          olives: {},
          tomatoes: {},
          salmon: {},
          mozzarella: {},
          parmesan: {},
          blue_cheese: {},
        },
        pizzaPrice: 0,
        isReadyToCook: false,
      };
    },
    watch: {
      pizzaData: {
        deep: true,
        handler() {
          this.getPizzaPrice();
          this.checkReadyToCook();
        },
      },
    },
    methods: {
      // getPizzaPrice() {
      //   let fillingPrice = 0;
      //   for (let fil in this.pizzaData.filling) {
      //     fillingPrice += this.pizzaData.filling[fil]?.price ?? 0;
      //   }
      //   this.pizzaPriceData = {
      //     sizeMultiplier: this.pizzaData.size?.multiplier ?? 0,
      //     doughPrice: this.pizzaData.dough?.price ?? 0,
      //     saucePrice: this.pizzaData.sauce?.price ?? 0,
      //     ingredientPrice: fillingPrice,
      //   };
      // countPrice() {
      //   // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      //   let pizzaPrice = 0;
      //   if (this.priceData.doughPrice || this.priceData.saucePrice || this.priceData.ingredientPrice) {
      //     pizzaPrice = this.priceData.doughPrice + this.priceData.saucePrice + this.priceData.ingredientPrice;
      //   }
      //   if (this.priceData.sizeMultiplier) {
      //     pizzaPrice = pizzaPrice * this.priceData.sizeMultiplier;
      //   }
      //   return pizzaPrice;
      // },
    },
    // checkReadyToCook() {
    //   let ingredient = false;
    //   for (let fil in this.pizzaData.filling) {
    //     if (this.pizzaData.filling[fil]?.counter > 0) {
    //       ingredient = this.pizzaData.filling[fil]?.counter > 0;
    //       break;
    //     }
    //   }
    //   this.isReadyToCook = ingredient && this.pizzaData.name;
    // },
    // },
  };
</script>

<style scoped>

</style>
