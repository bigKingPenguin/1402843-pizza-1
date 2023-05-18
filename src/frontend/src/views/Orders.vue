<template>
  <Sidebar/>

  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <HistoryOrder/>


  </div>
</template>

<script>
  import Sidebar from '@/common/sidebar/Sidebar.vue';
  import HistoryOrder from '@/components/orders/HistoryOrder.vue';

  export default {
    name: 'Orders',
    components: {HistoryOrder, Sidebar},
  };
</script>

<style scoped>

</style>
