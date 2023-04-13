<template>
  <div>
   <span
     :class="`${itemType} ${itemType}--${data.value}`"
     :draggable="itemDraggable && isDraggable"
     @dragstart.self="onDrag"
     @dragover.prevent
     @dragenter.prevent
   >
     {{ data.name }}
   </span>

    <div
      class="counter counter--orange"
      :class="`${counterType}__counter`"
    >
      <button
        type="button"
        class="counter__button counter__button--minus"
        :class="{'counter__button--disabled': counter === 0}"
        @click="counterMinus"
        :disabled="counter === 0"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        v-model="counter"
        readonly
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="counterPlus"
        :disabled="counter === this.itemMaximumCount"
        :class="{'counter__button--disabled': counter === 0}"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </div>
</template>

<script>
  import {DATA_TRANSFER_TEXT_TYPE} from '@/common/const/constants';
  import emitter from '@/services/emitter';

  export default {
    name: 'ItemCounter',
    props: {
      data: {
        type: Object,
        required: true,
      },
      itemType: {
        type: String,
        required: true,
      },
      counterType: {
        type: String,
        required: true,
      },
      itemMaximumCount: {
        type: Number,
        default: 100,
      },
      itemDraggable: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data() {
      return {
        counter: 0,
      };
    },
    mounted() {
      emitter.on(`add-${this.data.value}`, this.counterPlus);
    },
    beforeUnmount() {
      emitter.off(`add-${this.data.value}`, this.counterPlus);
    },
    computed: {
      isDraggable() {
        return this.counter !== this.itemMaximumCount;
      },
    },
    methods: {
      counterPlus() {
        this.counter++;
        this.$emit('quantitySelected', {...this.data, counter: this.counter});
      },
      counterMinus() {
        this.counter--;
        this.$emit('quantitySelected', {...this.data, counter: this.counter});
      },
      onDrag({dataTransfer}) {
        dataTransfer.setData(DATA_TRANSFER_TEXT_TYPE, this.data.value);
      },
    },
  };
</script>

<style scoped>

</style>
