<template>
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
          <Button
            buttonText="Создать пиццу"
            buttonClass="button button--green"
            @click="router.push('/')"
          />
        </div>

        <template v-else>
          <AssembledPizza/>

          <template v-if="isLoaded">
            <AdditionalProducts
              :additionalProducts="additionalProducts"
            />

            <DeliveryInformation
              :userAddress="currentAddress"
            />
          </template>
        </template>
      </div>
    </main>
  </form>
  <CartFooter
    v-if="Object.keys(store.state.cart.selectedPizzas).length"
    :orderCost="orderCost"
  />
</template>

<script>
  import AssembledPizza from '@/components/cart/components/AssembledPizza.vue';
  import AdditionalProducts from '@/components/cart/components/AdditionalProducts.vue';
  import DeliveryInformation from '@/components/cart/components/DeliveryInformation.vue';
  import {useStore} from 'vuex';
  import {computed, onMounted, ref, watch} from 'vue';
  import {getAdditionalProducts, getUserAddress} from '@/services/cart.service';
  import CartFooter from '@/components/cart/components/CartFooter.vue';
  import {getStorageData} from '@/plugins/localStorage.service';
  import Button from '@/common/button/Button.vue';
  import {useRouter} from 'vue-router';

  export default {
    name: 'Cart',
    components: {Button, CartFooter, DeliveryInformation, AdditionalProducts, AssembledPizza},
    setup() {
      const store = useStore();
      const router = useRouter();

      const additionalProducts = ref(null);
      const currentAddress = ref([]);
      const isLoaded = ref(false);

      const user = computed(() => store.state.user.user);

      onMounted(async () => {
        additionalProducts.value = await getAdditionalProducts();
        if (user.value) {
          currentAddress.value = await getUserAddress();
        }
        isLoaded.value = true;
        for (let product in additionalProducts.value) {
          if (getStorageData(`additional_${additionalProducts.value[product].value}`)) {
            store.commit('cart/addAdditionalProduct', {
              ...additionalProducts.value[product],
              quantity: +getStorageData(`additional_${additionalProducts.value[product].value}`),
            });
          }
        }
        if (user.value) {
          store.commit('cart/getPhoneNumber', user.value.phone);
        }
      });

      watch(() => user.value, async (user) => {
        if (user && isLoaded.value) {
          currentAddress.value = await getUserAddress();
        }
      });

      const orderCost = computed(() => {
        return store.getters['cart/calculateFinalCost'];
      });

      return {
        store,
        isLoaded,
        additionalProducts,
        orderCost,
        currentAddress,
        router,
      };
    },
  };
</script>

<style scoped>

</style>
