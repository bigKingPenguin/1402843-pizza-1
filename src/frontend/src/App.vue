<template>
  <div>
    <component
      :is="layout"
    >
      <router-view/>
    </component>
  </div>
</template>

<script>
  import '@/assets/scss/app.scss';
  import {computed} from 'vue';
  import {useRoute} from 'vue-router';
  import appLayout from '@/layouts/AppLayout.vue';

  export default {
    name: 'App',
    components: {
      appLayout: () => import('@/layouts/AppLayout.vue'),
    },
    setup() {
      const route = useRoute();
      const layout = computed(() => route.meta?.layout ? route.meta.layout : appLayout);
      return {
        layout,
      };
    },
  };
</script>

