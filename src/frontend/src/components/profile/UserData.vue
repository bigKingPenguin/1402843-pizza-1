<template>
  <div class="user">
    <img :src="user.avatar" :alt="user.name" width="72" height="72">
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>{{ user.phone }}</span></p>
  </div>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';

  export default {
    name: 'UserData',
    setup() {
      const store = useStore();

      return {
        user: computed(() => store.state.user.user),
      };
    },
  };
</script>

<style scoped>

</style>
