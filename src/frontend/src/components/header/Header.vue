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
      v-if="!user"
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
      <router-link to="/profile">
        <img :src="store.state.user.user.avatar" :alt="`${user.name}`" width="32"
             height="32">
        <span>{{ store.state.user.user.name }}</span>
      </router-link>
      <a
        href="#"
        class="header__logout"
        @click.prevent="logOut"
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
  import {useRoute, useRouter} from 'vue-router';
  import {logout} from '@/services/authorisation.service';

  export default {
    name: 'Header',
    components: {Login, VueFinalModal},

    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      const orderCost = computed(() => {
        return store.getters['cart/calculateFinalCost'];
      });

      const logOut = () => {
        logout();
        if (route.path === '/profile') {
          router.push({name: 'main'});
        }
      };

      return {
        store,
        router,
        orderCost,
        user: computed(() => store.state.user.user),
        logOut,
      };
    },
  };
</script>

<style scoped>

</style>
