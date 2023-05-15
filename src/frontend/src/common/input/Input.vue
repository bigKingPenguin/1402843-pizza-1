<template>
  <label :class="`input ${labelClass}`">
    <span :class="{'visually-hidden' : isHiddenLabel}">
      {{ inputLabel }}
    </span>
    <input
      :name="inputName"
      :type="inputType"
      :autocomplete="autocomplete"
      v-model="value"
      :placeholder="inputPlaceholder"
      :required="isRequired"
    />
  </label>
</template>

<script>
  import {computed} from 'vue';

  export default {
    name: 'Input',
    props: {
      inputLabel: {
        type: String,
        required: true,
      },
      labelClass: {
        type: String,
        default: '',
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
      inputValue: {
        type: String,
        default: '',
      },
      inputType: {
        type: String,
        required: true,
      },
      autocomplete: {
        type: String,
        default: '',
      },
    },
    emits: ['update:onInput'],
    setup(props, {emit}) {
      const value = computed({
        get() {
          return props.inputValue;
        },
        set(value) {
          emit('update:onInput', value);
        },
      });

      return {
        value,
      };
    },
  };
</script>

<style scoped>

</style>
