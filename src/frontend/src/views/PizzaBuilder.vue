<template>
  <div>
    <form v-if="isLoaded">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughtSelector :pizzaDough="pizzaData.dough"/>
        <BuilderSizeSelector :pizzaSizes="pizzaData.sizes"/>
        <BuilderIngredientsSelector
          :pizzaSauce="pizzaData.sauce"
          :pizzaFilling="pizzaData.filling"
        />

        <div class="content__pizza">
          <Input
            inputType="text"
            inputLabel="Название пиццы"
            :inputValue="inputValue"
            isHiddenLabel
            inputName="pizza_name"
            inputPlaceholder="Введите название пиццы"
            isRequired
            @update:onInput="savePizzaName"
          />
          <BuilderPizzaView/>

          <div class="content__result">
            <BuilderPriceCounter/>
            <Button
              :class="{'button--disabled': !isReadyToCook}"
              :disabled="!isReadyToCook"
              buttonClass="button"
              :buttonText="isEdit ? 'Сохранить' : 'Добавить в корзину'"
              @click="addToCart"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import BuilderDoughtSelector from '@/components/builder/components/BuilderDoughtSelector.vue';
  import BuilderSizeSelector from '@/components/builder/components/BuilderSizeSelector.vue';
  import BuilderIngredientsSelector from '@/components/builder/components/BuilderIngredientsSelector.vue';
  import Input from '@/common/input/Input.vue';
  import BuilderPizzaView from '@/components/builder/components/BuilderPizzaView.vue';
  import Button from '@/common/button/Button.vue';
  import BuilderPriceCounter from '@/components/builder/components/BuilderPriceCounter.vue';
  import {computed, onMounted, ref} from 'vue';
  import {useStore} from 'vuex';
  import {COUNT_PRICE, IS_READY_TO_COOK} from '@/store/modules/builder-getter-types';
  import {getPizzaData} from '@/services/pizzaBuilder.service';
  import {DEFAULT_DOUGH, DEFAULT_SAUCE, DEFAULT_SIZE, DOUGH, NAME, PIZZA, ROUTE_CART, SAUCE, SIZE} from '@/common/const/constants';
  import {getStorageData, removeStorageData, saveDataInStorage} from '@/plugins/localStorage.service';
  import router from '@/router/router';

  export default {
    name: 'PizzaBuilder',
    components: {
      BuilderPriceCounter,
      Button, BuilderPizzaView, BuilderIngredientsSelector, BuilderSizeSelector, BuilderDoughtSelector, Input,
    },
    setup() {
      const store = useStore();
      const isLoaded = ref(false);

      const pizzaData = ref(null);

      const isEdit = computed(() => store.state.builder.isEdit);

      const setDefaultConsist = () => {
        store.commit('builder/setPizzaName', getStorageData(NAME));
        store.commit('builder/setPizzaDough', pizzaData.value.dough.find((el) => el.value === (getStorageData(DOUGH) || DEFAULT_DOUGH)));
        store.commit('builder/setPizzaSize', pizzaData.value.sizes.find((el) => el.value === (getStorageData(SIZE) || DEFAULT_SIZE)));
        store.commit('builder/setPizzaSauce', pizzaData.value.sauce.find((el) => el.value === (getStorageData(SAUCE) || DEFAULT_SAUCE)));
        setDefaultIngredients();
      };

      const setDefaultIngredients = () => {
        for (let fil in pizzaData.value.filling) {
          if (getStorageData(pizzaData.value.filling[fil].value)) {
            store.commit('builder/addFilling', {
              ...pizzaData.value.filling[fil],
              counter: getStorageData(pizzaData.value.filling[fil].value),
            });
          }
        }
      };

      onMounted(async () => {
        pizzaData.value = await getPizzaData();
        if (!isEdit.value) {
          setDefaultConsist();
        }
        isLoaded.value = true;
      });

      const savePizzaName = (event) => {
        store.commit('builder/setPizzaName', event);
        saveDataInStorage(NAME, event);
        if (event === '') removeStorageData(NAME);
      };

      const countPrice = computed(() => store.getters[COUNT_PRICE]);

      const storeBuilder = computed(() => store.state.builder);

      const addToCart = () => {
        if (isEdit.value) {
          store.commit('cart/removePizza', storeBuilder.value.editedPizzaName);
          store.commit('builder/toggleEditState');
          router.push(ROUTE_CART);
        }
        store.commit('cart/addPizza', {
          name: storeBuilder.value.selectedPizzaName,
          consist: {
            dough: storeBuilder.value.selectedDough,
            size: storeBuilder.value.selectedSize,
            sauce: storeBuilder.value.selectedSauce,
            filling: storeBuilder.value.selectedFilling,
          },
          price: countPrice.value,
          quantity: 1,
        });
        saveDataInStorage(PIZZA, JSON.stringify(store.state.cart.selectedPizzas));
        removeStorageData(NAME);
        removeStorageData(DOUGH);
        removeStorageData(SIZE);
        removeStorageData(SAUCE);
        for (let fil in storeBuilder.value.selectedFilling) {
          if (getStorageData(storeBuilder.value.selectedFilling[fil].value)) {
            removeStorageData(storeBuilder.value.selectedFilling[fil].value);
          }
        }
        store.commit('builder/resetBuilder');
        setDefaultConsist();
      };

      return {
        store,
        isLoaded,
        pizzaData,
        isReadyToCook: computed(() => store.getters[IS_READY_TO_COOK]),
        inputValue: computed(() => store.state.builder.selectedPizzaName),
        isEdit,
        savePizzaName,
        countPrice,
        addToCart,
      };
    },
  };
</script>

<style scoped>

</style>
