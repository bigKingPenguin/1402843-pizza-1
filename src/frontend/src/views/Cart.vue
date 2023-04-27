<template>
  <div>
    <form class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div
            class="sheet cart__empty"
            v-if="!Object.keys(store.state.cart.selectedPizzas).length"
          >
            <p>В корзине нет ни одного товара</p>
          </div>

          <template v-else>
            <AssembledPizza/>

            <AdditionalProducts
              :additionalProducts="additionalProducts"
            />

            <DeliveryInformation/>
          </template>

        </div>
      </main>
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
            <button type="submit" class="button">Оформить заказ</button>
          </div>
        </section>
      </template>
    </form>
  </div>

</template>

<script>
  import AssembledPizza from '@/components/cart/components/AssembledPizza.vue';
  import AdditionalProducts from '@/components/cart/components/AdditionalProducts.vue';
  import DeliveryInformation from '@/components/cart/components/DeliveryInformation.vue';
  import {useStore} from 'vuex';
  import {computed, onMounted, ref} from 'vue';
  import {getAdditionalProducts} from '@/services/cart.service';

  export default {
    name: 'Cart',
    components: {DeliveryInformation, AdditionalProducts, AssembledPizza},
    setup() {
      const store = useStore();
      const additionalProducts = ref(null);

      onMounted(async () => {
        additionalProducts.value = await getAdditionalProducts();
        return additionalProducts;
      });

      const orderCost = computed(() => {
        return store.getters['cart/calculateFinalCost'];
      });

      return {
        store,
        additionalProducts,
        orderCost,
      };
    },
  };
</script>

<style scoped>

</style>
