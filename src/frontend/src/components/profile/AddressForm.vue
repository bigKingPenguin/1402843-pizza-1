<template>
  <div class="layout__address">
    <form class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <b>{{ changingAddress ? model.name : 'Новый адрес' }}</b>
      </div>

      <div class="address-form__wrapper">

        <div class="address-form__input">
          <Input
            inputType="text"
            inputName="addr-name"
            inputLabel="Название адреса*"
            inputPlaceholder="Введите название адреса"
            isRequired
            :inputValue="model.name"
            @update:onInput="model.name = $event"
          />
        </div>

        <div class="address-form__input address-form__input--size--normal">
          <Input
            inputType="text"
            inputName="addr-street"
            inputLabel="Улица*"
            inputPlaceholder="Введите название улицы"
            isRequired
            :inputValue="model.street"
            @update:onInput="model.street = $event"
          />
        </div>

        <div class="address-form__input address-form__input--size--small">
          <Input
            inputType="text"
            inputName="addr-house"
            inputLabel="Дом*"
            inputPlaceholder="Введите номер дома"
            isRequired
            :inputValue="model.building"
            @update:onInput="model.building = $event"
          />
        </div>

        <div class="address-form__input address-form__input--size--small">
          <Input
            inputType="text"
            inputName="addr-apartment"
            inputLabel="Квартира"
            inputPlaceholder="Введите № квартиры"
            :inputValue="model.flat"
            @update:onInput="model.flat = $event"
          />
        </div>

        <div class="address-form__input">
          <Input
            inputType="text"
            inputName="addr-comment"
            inputLabel="Комментарий"
            inputPlaceholder="Введите комментарий"
            :inputValue="model.comment"
            @update:onInput="model.comment = $event"
          />
        </div>

      </div>

      <div class="address-form__buttons">
        <Button
          buttonType="button"
          buttonClass="button button--transparent"
          buttonText="Отменить"
          @click="closeForm"
        />
        <Button
          buttonType="submit"
          buttonClass="button"
          buttonText="Сохранить"
          :disabled="!isReadyToSave"
          :class="{'button--disabled': !isReadyToSave}"
          @click.prevent="saveAddress"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import Input from '@/common/input/Input.vue';
  import Button from '@/common/button/Button.vue';
  import {computed, onMounted, ref} from 'vue';
  import {useStore} from 'vuex';
  import {editAddress, setAddress} from '@/services/address.service';

  export default {
    name: 'AddressForm',
    components: {Button, Input},
    emits: ['closeForm', 'closeFormAndRefresh'],
    setup(props, {emit}) {
      const store = useStore();
      const changingAddress = computed(() => store.state.user.changingAddress);

      const model = ref({
        name: '',
        userId: store.state.user.user.id,
        street: '',
        building: '',
        flat: '',
        comment: '',
      });

      onMounted(() => {
        if (changingAddress.value) {
          for (let i in changingAddress.value) {
            model.value[i] = changingAddress.value[i];
          }
        }
      });

      const closeForm = () => {
        store.commit('user/clearChangingAddress');
        emit('closeForm');
      };

      const isReadyToSave = computed(() => model.value.name && model.value.street && model.value.building);

      const saveAddress = async () => {
        if (changingAddress.value) {
          await editAddress(model.value, changingAddress.value.id);
          store.commit('user/clearChangingAddress');
        } else {
          await setAddress(model.value);
        }
        emit('closeFormAndRefresh');
      };

      return {
        model,
        isReadyToSave,
        saveAddress,
        changingAddress,
        closeForm,
      };
    },
  };
</script>

<style scoped>

</style>
