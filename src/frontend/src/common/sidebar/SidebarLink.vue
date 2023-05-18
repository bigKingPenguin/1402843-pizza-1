<template>
  <component
    :is="isActive ? 'span' : 'router-link'"
    :to="isActive ? null : linkTo"
    class="layout__link"
    :class="{'layout__link--active' : isActive}"
  >
    {{ routeName }}
  </component>
</template>

<script>
  export default {
    name: 'SidebarLink',
    props: {
      linkTo: {
        type: String,
        required: true,
      },
      routeName: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>

</style>
