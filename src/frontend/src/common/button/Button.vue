<template>
  <button
    :type="buttonType"
    :class="buttonClass"
  >
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      buttonText: {
        type: String,
        default: '',
      },
      buttonClass: {
        type: String,
        required: true,
      },
      buttonType: {
        type: String,
        default: 'button',
      },
    },
  };
</script>

<style scoped>

</style>
