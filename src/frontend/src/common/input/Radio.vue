<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="data.value"
      :checked="isChecked"
      @change="$emit('itemSelected', data)"
    />
    <span>
      {{ data.name }}
    </span>
  </label>
</template>

<script>
  export default {
    name: 'Radio',
    props: {
      data: {
        type: Object,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      isChecked: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
