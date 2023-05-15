<template>
  <Header></Header>
  <main class="content">
    <slot/>
  </main>
</template>

<script>
  import Header from '@/components/header/Header.vue';

  export default {
    name: 'MainLayout',
    components: {Header},
  };
</script>

<style scoped>

</style>
