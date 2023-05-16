<template>
  <Sidebar/>
  <template v-if="isLoaded">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <UserData/>

      <Address/>

      <AddressForm/>

      <div class="layout__button">
        <Button
          buttonType="button"
          buttonClass="button button--border"
          buttonText="Добавить новый адрес"
        />
      </div>
    </div>
  </template>
</template>

<script>
  import Address from '@/components/profile/Address.vue';
  import AddressForm from '@/components/profile/AddressForm.vue';
  import Sidebar from '@/common/sidebar/Sidebar.vue';
  import UserData from '@/components/profile/UserData.vue';
  import {onMounted, ref} from 'vue';
  import {getUserAddress} from '@/services/cart.service';
  import Button from '@/common/button/Button.vue';

  export default {
    name: 'Profile',
    components: {Button, UserData, Sidebar, AddressForm, Address},
    setup() {
      const isLoaded = ref(false);

      onMounted(async () => {
        const userAddresses = await getUserAddress();
        isLoaded.value = true;
        return userAddresses;
      });

      return {
        isLoaded,
      };
    },
  };
</script>

<style scoped>

</style>
