<template>
  <div>
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
  import Header from '@/components/header/Header.vue';
  import Main from '@/components/Main.vue';

  export default {
    name: 'MainLayout',
    components: {Main, Header},
  };
</script>

<style scoped>

</style>
