<template>
  <div class="cart__form">
    <div class="cart-form">

      <div class="cart-form__wrapper">

        <Select
          :selectOptions="selectDeliveryOptions"
          selectLabel="Получение заказа:"
          selectType="cart-form"
          selectName="delivery-method"
          :defaultValue="deliveryMethod"
          @update:onSelect="store.commit('cart/changeDeliveryMethod', $event)"
        />

        <Input
          inputType="text"
          inputName="tel"
          inputLabel="Контактный телефон:"
          labelClass="input--big-label"
          inputPlaceholder="+7 999-999-99-99"
          :inputValue="store.state.user.user?.phone"
          isRequired
          @update:onInput="store.commit('cart/getPhoneNumber', $event)"
        />

      </div>
      <div
        v-if="deliveryMethod === DELIVERY_NEW_ADDRESS"
        class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <Input
            inputType="text"
            :inputName="addressInputs.street.name"
            :inputLabel="addressInputs.street.label"
            isRequired
            @update:onInput="store.commit('cart/getStreetData', $event)"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <Input
            inputType="text"
            :inputName="addressInputs.house.name"
            :inputLabel="addressInputs.house.label"
            isRequired
            @update:onInput="store.commit('cart/getBuildingData', $event)"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <Input
            inputType="text"
            :inputName="addressInputs.apart.name"
            :inputLabel="addressInputs.apart.label"
            :isRequired="false"
            @update:onInput="store.commit('cart/getFlatData', $event)"
          />
        </div>
      </div>

      <div class="cart-form__wrapper">
        <Select
          v-if="deliveryMethod === 'home'"
          selectLabel="Ваш адрес:"
          selectName="address"
          selectType="cart-form"
          :selectOptions="selectAddressOptions"
          @update:onSelect="onCurrentAddressSelect"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import {useStore} from 'vuex';
  import Select from '@/common/input/Select.vue';
  import {computed, watch} from 'vue';
  import Input from '@/common/input/Input.vue';
  import {DELIVERY_HIMSELF, DELIVERY_HOME, DELIVERY_NEW_ADDRESS} from '@/common/const/constants';

  export default {
    name: 'DeliveryInformation',
    components: {Input, Select},
    props: {
      userAddress: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();

      watch(() => store.state.user.user, (user) => {
        if (!user) {
          store.commit('cart/changeDeliveryMethod', DELIVERY_HIMSELF);
        }
      });

      const selectDeliveryOptions = computed(() => {
          const selectArray = [
            {text: 'Заберу сам', value: DELIVERY_HIMSELF},
            {text: 'Новый адрес', value: DELIVERY_NEW_ADDRESS},
          ];
          if (store.state.user.user) {
            selectArray.push({text: 'Дом', value: DELIVERY_HOME});
          }
          return selectArray;
        },
      );

      const selectAddressOptions = computed(() => {
        return props.userAddress.map((elem) => {
          return {
            value: elem.id,
            text: elem.name,
          };
        });
      });

      const addressInputs = computed(() => {
        const inputs = {
          street: {label: 'Улица*', name: 'street'},
          house: {label: 'Дом*', name: 'house'},
          apart: {label: 'Квартира', name: 'apartment'},
        };
        return inputs;
      });

      const setSelectedAddress = (index) => {
        store.commit('cart/getStreetData', props.userAddress[index].street);
        store.commit('cart/getBuildingData', props.userAddress[index].building);
        store.commit('cart/getFlatData', props.userAddress[index]?.flat ?? '');
        store.commit('cart/getComment', props.userAddress[index]?.comment ?? '');
      };

      const onCurrentAddressSelect = (event) => {
        const index = props.userAddress.findIndex((e) => e.id === event);
        setSelectedAddress(index);
      };

      watch(() => store.state.cart.delivery.deliveryMethod, (method) => {
        store.commit('cart/clearAddress');
        if (method === DELIVERY_HOME) {
          setSelectedAddress(0);
        }
      });

      return {
        DELIVERY_HIMSELF,
        DELIVERY_NEW_ADDRESS,
        DELIVERY_HOME,
        store,
        selectDeliveryOptions,
        selectAddressOptions,
        deliveryMethod: computed(() => store.state.cart.delivery.deliveryMethod),
        addressInputs,
        onCurrentAddressSelect,
      };
    },
  };
</script>

<style scoped>

</style>
