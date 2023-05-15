<template>
  <label :class="`${props.selectType}__select`">
    <span :class="`${props.selectType}__label`">
      {{ props.selectLabel }}
    </span>
    <select
      :name="props.selectName"
      class="select"
      v-model="selected"
    >
      <option
        v-for="option in props.selectOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>

<script>
  import {computed} from 'vue';

  export default {
    name: 'Select',
    props: {
      selectOptions: {
        type: Array,
        required: true,
      },
      selectLabel: {
        type: String,
        default: '',
      },
      selectType: {
        type: String,
        required: true,
      },
      selectName: {
        type: String,
        required: true,
      },
      defaultValue: {
        type: String,
        default: '',
      },
    },
    emits: ['update:onSelect'],
    setup(props, {emit}) {
      const selected = computed({
        get() {
          return props.defaultValue ? props.defaultValue : props.selectOptions[0].value;
        },
        set(value) {
          emit('update:onSelect', value);
        },
      });

      return {
        props,
        selected,
      };
    },
  };
</script>

<style scoped>

</style>
