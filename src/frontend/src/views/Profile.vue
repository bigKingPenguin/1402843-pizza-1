<template>
  <Sidebar/>
  <template v-if="isLoaded">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <UserData/>

      <Address
        @changeAddress="changeAddress($event)"
        @refreshPage="refreshPage"
      />

      <AddressForm
        v-if="isFormOpen"
        @closeForm="isFormOpen = false"
        @closeFormAndRefresh="refreshPage"
      />

      <div class="layout__button">
        <Button
          buttonType="button"
          buttonClass="button button--border"
          buttonText="Добавить новый адрес"
          @click="isFormOpen = true"
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
  import {getUserAddress} from '@/services/address.service';
  import Button from '@/common/button/Button.vue';
  import {useStore} from 'vuex';

  export default {
    name: 'Profile',
    components: {Button, UserData, Sidebar, AddressForm, Address},
    setup() {
      const store = useStore();
      const isLoaded = ref(false);
      const isFormOpen = ref(false);

      const getAddress = async () => {
        const userAddresses = await getUserAddress();
        store.commit('user/clearAddresses');
        for (let address in userAddresses) {
          store.commit('user/getUserAddress', userAddresses[address]);
        }
      };

      onMounted(async () => {
        await getAddress();
        isLoaded.value = true;
      });

      const refreshPage = async () => {
        await getAddress();
        isFormOpen.value = false;
      };

      const changeAddress = (address) => {
        console.log(address);
        store.commit('user/addChangingAddress', address);
        isFormOpen.value = true;
      };

      return {
        isLoaded,
        isFormOpen,
        changeAddress,
        refreshPage,
      };
    },
  };
</script>

<style scoped>

</style>
