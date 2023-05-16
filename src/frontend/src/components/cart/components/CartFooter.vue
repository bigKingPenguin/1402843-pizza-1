<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
    <div class="footer__price">
      <b>Итого: {{ orderCost }} ₽</b>
    </div>

    <div class="footer__submit">
      <Button
        :class="{'button--disabled': !store.getters['cart/isReadyToOrder']}"
        buttonType="submit"
        buttonClass="button"
        buttonText="Оформить заказ"
        @click="onOrderSubmit"
      />
    </div>
  </section>
</template>

<script>
  import {useStore} from 'vuex';
  import Button from '@/common/button/Button.vue';
  import {submitOrder} from '@/services/cart.service';
  import {DELIVERY_HIMSELF} from '@/common/const/constants';
  import {computed} from 'vue';

  export default {
    name: 'CartFooter',
    components: {Button},
    props: {
      orderCost: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      const selectedPizzas = computed(() => store.state.cart.selectedPizzas);
      const additionalProducts = computed(() => store.state.cart.additionalProducts);
      const deliveryInformation = computed(() => store.state.cart.delivery);
      const user = computed(() => store.state.user.user);

      const composePizzasArray = () => {
        const pizzas = [];

        for (let pizza in selectedPizzas.value) {
          const ingredients = [];

          for (let ingredient in selectedPizzas.value[pizza].consist.filling) {
            ingredients.push({
              ingredientId: selectedPizzas.value[pizza].consist.filling[ingredient].id,
              quantity: selectedPizzas.value[pizza].consist.filling[ingredient].counter,
            });
          }

          pizzas.push({
            name: selectedPizzas.value[pizza].name,
            sauceId: selectedPizzas.value[pizza].consist.sauce.id,
            doughId: selectedPizzas.value[pizza].consist.dough.id,
            sizeId: selectedPizzas.value[pizza].consist.size.id,
            quantity: selectedPizzas.value[pizza].quantity,
            ingredients: ingredients,
          });
        }
        return pizzas;
      };

      const composeMiscArray = () => {
        const misc = [];

        for (let add in additionalProducts.value) {
          misc.push({
            miscId: additionalProducts.value[add]?.id,
            quantity: additionalProducts.value[add]?.quantity,
          });
        }
        return misc;
      };

      const onOrderSubmit = () => {
        if (deliveryInformation.value.deliveryMethod === DELIVERY_HIMSELF) {
          submitOrder({
              userId: user?.value?.id ?? null,
              phone: deliveryInformation.value.phone,
              pizzas: composePizzasArray(),
              misc: composeMiscArray(),
            },
          );
        } else {
          submitOrder({
              userId: user?.value?.id ?? null,
              phone: deliveryInformation.value.phone,
              address: {
                street: deliveryInformation.value.street ?? '',
                building: deliveryInformation.value.building ?? '',
                flat: deliveryInformation.value.flat ?? '',
                comment: deliveryInformation.value.comment ?? '',
              },
              pizzas: composePizzasArray(),
              misc: composeMiscArray(),
            },
          );
        }
        store.commit('common/toggleOrderSubmitPopup', true);
      };

      return {
        store,
        onOrderSubmit,
      };
    },
  };
</script>

<style scoped>

</style>
