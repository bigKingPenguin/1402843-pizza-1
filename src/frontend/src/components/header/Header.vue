<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to="/"
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ orderCost }} ₽</router-link>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';

  export default {
    name: 'Header',
    setup() {
      const store = useStore();

      const orderCost = computed(() => {
        return store.getters['cart/calculateFinalCost'];
      });

      return {
        orderCost,
      };
    },
  };
</script>

<style scoped>

</style>
