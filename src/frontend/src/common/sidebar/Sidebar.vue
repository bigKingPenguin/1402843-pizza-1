<template>
  <div class="layout__sidebar sidebar">

    <router-link
      :to="ROUTE_MAIN"
      class="logo layout__logo"
    >
      <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
    </router-link>

    <SidebarLink
      v-for="link in routes"
      :key="link.route"
      :routeName="link.name"
      :linkTo="link.route"
      :isActive="route.path === link.route"
    />

  </div>
</template>

<script>
  import {ROUTE_MAIN, ROUTE_ORDERS, ROUTE_PROFILE} from '@/common/const/constants';
  import {useRoute} from 'vue-router';
  import SidebarLink from '@/common/sidebar/SidebarLink.vue';

  export default {
    name: 'Sidebar',
    components: {SidebarLink},
    setup() {
      const route = useRoute();

      const routes = [
        {
          name: 'Мои данные',
          route: ROUTE_PROFILE,
        },
        {
          name: 'История заказов',
          route: ROUTE_ORDERS,
        },
      ];

      return {
        ROUTE_MAIN,
        ROUTE_ORDERS,
        ROUTE_PROFILE,
        route,
        routes,
      };
    },
  };
</script>

<style scoped>

</style>
