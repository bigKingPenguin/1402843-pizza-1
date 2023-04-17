<template>
  <label :class="`${name}__input ${name}__input--${data.value}`">
    <input
      type="radio"
      :name="name"
      :value="data.value"
      class="visually-hidden"
      @change="$emit('itemSelected', data)"
    />
    <b v-if="name === 'dough'">
      {{ data.name }}
    </b>
    <span>
      {{ name === 'dough' ? data.description : data.name }}
    </span>

  </label>
</template>

<script>
  export default {
    name: 'SelectorItem',
    props: {
      data: {
        type: Object,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
