<template>
  <p class="additional-list__description">
    <img
      :src="require(`@/assets/img/${itemData.value}.svg`)"
      width="39"
      height="60"
      :alt="itemData.name"
    >
    <span>{{ itemData.name }}</span>
    <span> {{ itemData.price }} ₽</span>
  </p>

  <div class="additional-list__wrapper">
    <ItemCounter
      :defaultCounter="counter"
      counterType="additional-list"
      counterButtonColor="orange"
      @counterPlus="onCounterChange(counter + 1)"
      @counterMinus="onCounterChange(counter -1)"
    />

    <div class="additional-list__price">
      <b>{{ itemCost }} ₽</b>
    </div>
  </div>
</template>

<script>
  import ItemCounter from '@/common/input/ItemCounter.vue';
  import {computed, ref} from 'vue';
  import {useStore} from 'vuex';
  import {removeStorageData, saveDataInStorage} from '@/plugins/localStorage.service';

  export default {
    name: 'AdditionalItem',
    components: {ItemCounter},
    props: {
      itemData: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();

      const counter = computed(() => store.state.cart.additionalProducts[props.itemData.value]?.quantity ?? 0);

      const itemPrice = ref(props.itemData.price);
      const itemCost = computed(() => itemPrice.value * counter.value);

      const onCounterChange = (event) => {
        store.commit('cart/addAdditionalProduct', {
          ...props.itemData,
          quantity: event,
        });
        if (counter.value > 0) {
          saveDataInStorage(`additional_${props.itemData.value}`, counter.value);
        } else {
          removeStorageData(`additional_${props.itemData.value}`);
        }
      };

      return {
        counter,
        itemCost,
        onCounterChange,
      };
    },
  };
</script>

<style scoped>

</style>
