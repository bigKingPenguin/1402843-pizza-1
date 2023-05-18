<template>
  <button
    :type="buttonType"
    :class="buttonClass"
  >
    <span
      v-if="hiddenDescription"
      class="visually-hidden"
    >
      {{ hiddenDescription }}
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
      hiddenDescription: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style scoped>

</style>
