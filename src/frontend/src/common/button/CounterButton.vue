<template>
  <button
    type="button"
    class="counter__button"
    :disabled="isDisabled"
    :class="[`counter__button--${counterType}`, counterButtonColor ? `counter__button--${counterButtonColor}` : '', {'counter__button--disabled': isDisabled}]"
    @click="$emit('onButtonClick')"
  >
    <span class="visually-hidden">{{ counterDescription }}</span>
  </button>
</template>

<script>
  export default {
    name: 'CounterButton',
    props: {
      counterType: {
        type: String,
        required: true,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      counterDescription: {
        type: String,
        required: true,
      },
      counterButtonColor: {
        type: String,
        default: null,
      },
    },
    emits: ['onButtonClick'],
  };
</script>

<style scoped>

</style>
