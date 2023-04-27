<template>
  <button
    type="button"
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
        required: true,
      },
      buttonClass: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
