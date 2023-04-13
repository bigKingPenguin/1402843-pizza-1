<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <!--                  TODO: указать дефолтные значения для v-model-->
        <!--      TODO: в pizza.json временно добавлен value для size-->
        <SelectorItem
          v-for="size in pizzaSizes"
          :key="size.id"
          name="diameter"
          :data="size"
          @itemSelected="$emit('sizeSelected', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>

  import SelectorItem from '@/common/input/SelectorItem.vue';

  export default {
    name: 'BuilderSize',
    components: {SelectorItem},
    props: {
      pizzaSizes: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
