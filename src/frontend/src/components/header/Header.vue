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

    <div
      v-if="!store.state.user.user"
      class="header__user"
    >
      <a
        href="#"
        class="header__login"
        @click.prevent="store.commit('common/toggleLoginModal', true)"
      >
        <span>Войти</span>
      </a>
    </div>

    <div
      v-else
      class="header__user"
    >
      <a
        href="#"
        @click="router.push('/cart')"
      >
        <img :src="require('@/assets/img/users/user5@2x.jpg')" :alt="`${store.state.user.user.name}`" width="32"
             height="32">
        <span>{{ store.state.user.user.name }}</span>
      </a>
      <a
        href="#"
        class="header__logout"
        @click.prevent="logout"
      >
        <span>Выйти</span>
      </a>
    </div>

  </header>
  <vue-final-modal
    :hideOverlay="false"
    overlayTransition="vfm-fade"
    contentTransition="vfm-fade"
    clickToClose
    escToClose
    lockScroll
    v-model="store.state.common.showLoginModal"
  >
    <Login
      @closeModal="store.commit('common/toggleLoginModal', false)"
    />
  </vue-final-modal>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';
  import {VueFinalModal} from 'vue-final-modal';
  import Login from '@/components/modals/Login.vue';
  import {useRouter} from 'vue-router';
  import {logout} from '@/services/authorisation.service';

  export default {
    name: 'Header',
    methods: {logout},
    components: {Login, VueFinalModal},

    setup() {
      const store = useStore();
      const router = useRouter();

      const orderCost = computed(() => {
        return store.getters['cart/calculateFinalCost'];
      });

      return {
        store,
        router,
        orderCost,
      };
    },
  };
</script>

<style scoped>

</style>
