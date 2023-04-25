<template>
  <div>
    <div
      class="counter counter--orange"
      :class="`${counterType}__counter`"
    >
      <CounterButton
        counterType="minus"
        :isDisabled="counter === itemMinimumCount"
        counterDescription="Меньше"
        @onButtonClick="$emit('counterMinus')"
      />
      <input
        type="text"
        name="counter"
        class="counter__input"
        v-model="counter"
        readonly
      />
      <CounterButton
        counterType="plus"
        :counterButtonColor="counterButtonColor"
        counterDescription="Больше"
        :isDisabled="counter === itemMaximumCount"
        @onButtonClick="$emit('counterPlus')"
      />
    </div>
  </div>
</template>

<script>
  import CounterButton from '@/common/button/CounterButton.vue';
  import {computed} from 'vue';

  export default {
    name: 'ItemCounter',
    components: {CounterButton},
    props: {
      counterType: {
        type: String,
        required: true,
      },
      itemMinimumCount: {
        type: Number,
        default: 0,
      },
      itemMaximumCount: {
        type: Number,
        default: 100,
      },
      defaultCounter: {
        type: Number,
        required: true,
      },
      counterButtonColor: {
        type: String,
        default: null,
      },
    },
    emits: ['counterMinus', 'counterPlus'],
    setup(props) {
      // computed используется только потому, что инпут readonly
      const counter = computed(() => props.defaultCounter);

      return {
        counter,
      };
    },
  };
</script>

<style scoped>

</style>
