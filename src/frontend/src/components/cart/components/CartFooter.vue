<template>
  <template v-if="Object.keys(store.state.cart.selectedPizzas).length">
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
</template>

<script>
  import {useStore} from 'vuex';
  import Button from '@/common/button/Button.vue';
  import {submitOrder} from '@/services/cart.service';
  import {DELIVERY_HIMSELF} from '@/common/const/constants';

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

      const composePizzasArray = () => {
        const pizzas = [];

        for (let pizza in store.state.cart.selectedPizzas) {
          const ingredients = [];

          for (let ingredient in store.state.cart.selectedPizzas[pizza].consist.filling) {
            ingredients.push({
              ingredientId: store.state.cart.selectedPizzas[pizza].consist.filling[ingredient].id,
              quantity: store.state.cart.selectedPizzas[pizza].consist.filling[ingredient].counter,
            });
          }

          pizzas.push({
            name: store.state.cart.selectedPizzas[pizza].name,
            sauceId: store.state.cart.selectedPizzas[pizza].consist.sauce.id,
            doughId: store.state.cart.selectedPizzas[pizza].consist.dough.id,
            sizeId: store.state.cart.selectedPizzas[pizza].consist.size.id,
            quantity: store.state.cart.selectedPizzas[pizza].quantity,
            ingredients: ingredients,
          });
        }
        return pizzas;
      };

      const composeMiscArray = () => {
        const misc = [];

        for (let add in store.state.cart.additionalProducts) {
          misc.push({
            miscId: store.state.cart.additionalProducts[add]?.id,
            quantity: store.state.cart.additionalProducts[add]?.quantity,
          });
        }
        return misc;
      };

      const onOrderSubmit = () => {
        if (store.state.cart.delivery.deliveryMethod === DELIVERY_HIMSELF) {
          return submitOrder({
            userId: store.state.user?.user?.id ?? '',
            phone: store.state.cart.delivery.phone,
            pizzas: composePizzasArray(),
            misc: composeMiscArray(),
          });
        } else {
          return submitOrder({
              userId: store.state.user?.user?.id ?? '',
              phone: store.state.cart.delivery.phone,
              address: {
                street: store.state.cart.delivery?.street ?? '',
                building: store.state.cart.delivery?.building ?? '',
                flat: store.state.cart.delivery?.flat ?? '',
                comment: store.state.cart.delivery?.comment ?? '',
              },
              pizzas: composePizzasArray(),
              misc: composeMiscArray(),
            },
          );
        }
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
