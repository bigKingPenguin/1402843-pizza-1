<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
  import '@/assets/scss/app.scss';
  import 'vue-final-modal/style.css';
  import {computed, onBeforeMount, onMounted} from 'vue';
  import {useRoute} from 'vue-router';
  import appLayout from '@/layouts/AppLayout.vue';
  import {getStorageData} from '@/plugins/localStorage.service';
  import {getUserData} from '@/services/user.service';
  import {PIZZA, TOKEN} from '@/common/const/constants';
  import {useStore} from 'vuex';

  export default {
    name: 'App',
    components: {
      appLayout: () => import('@/layouts/AppLayout.vue'),
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const layout = computed(() => route.meta?.layout ? route.meta.layout : appLayout);
      onBeforeMount(async () => {
        getStorageData(TOKEN);
        if (getStorageData(TOKEN)) await getUserData();
      });

      onMounted(() => {
        const pizza = getStorageData(PIZZA);
        if (pizza) {
          store.commit('cart/addPizzasFromStorage', JSON.parse(pizza));
        }
      });

      return {
        layout,
      };
    },
  };
</script>

