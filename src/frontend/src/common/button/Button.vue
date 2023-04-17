<template>
  <button type="button" class="button">
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
    },
  };
</script>

<style scoped>

</style>
