<template>
  <label class="input">
    <span
      :class="{'visually-hidden' : isHiddenLabel}"
    >
      {{ inputLabel }}
    </span>
    <input
      :name="inputName"
      type="text"
      :placeholder="inputPlaceholder"
      :required="isRequired"
      @input="$emit('onInput', $event.target.value)"
    />
  </label>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      inputLabel: {
        type: String,
        required: true,
      },
      isHiddenLabel: {
        type: Boolean,
        default: false,
      },
      inputName: {
        type: String,
        required: true,
      },
      inputPlaceholder: {
        type: String,
        default: '',
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>

</style>
