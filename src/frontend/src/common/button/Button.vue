<template>
  <button
    :type="buttonType"
    :class="buttonClass"
  >
    <span
      v-if="hiddenSpanDescription"
      class="visually-hidden"
    >
      {{ hiddenSpanDescription }}
    </span>
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
      hiddenSpanDescription: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style scoped>

</style>
