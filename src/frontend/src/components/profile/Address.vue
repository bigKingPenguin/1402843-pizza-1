<template>
  <div
    class="layout__address"
    v-for="address in addresses"
    :key="address.name"
  >
    <div class="sheet address-form">

      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <Button
            buttonType="button"
            buttonClass="icon icon--edit"
            hiddenDescription="Изменить адрес"
            @click="$emit('changeAddress', address.name)"
          />
          <Button
            buttonType="button"
            buttonClass="icon icon--delete"
            hiddenDescription="Удалить адрес"
            @click="deleteAddress(address.name)"
          />
        </div>
      </div>

      <p>ул. {{ address.street }}, д. {{ address.building }}{{ address.flat ? `, кв. ${address.flat}` : '' }}</p>
      <small>{{ address.comment }}</small>

    </div>
  </div>
</template>

<script>
  import {useStore} from 'vuex';
  import {computed} from 'vue';
  import Button from '@/common/button/Button.vue';
  import {removeAddress} from '@/services/address.service';

  export default {
    name: 'Address',
    components: {Button},
    emits: ['changeAddress', 'refreshPage'],
    setup(props, {emit}) {
      const store = useStore();

      const addresses = computed(() => store.state.user.address);

      const deleteAddress = async (addressName) => {
        await removeAddress(addresses.value[addressName].id);
        emit('refreshPage');
      };

      return {
        addresses,
        deleteAddress,
      };
    },
  };
</script>

<style scoped>

</style>
