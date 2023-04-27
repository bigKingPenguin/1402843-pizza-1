<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <!--      TODO: в pizza.json временно добавлен value для size-->
        <SelectorItem
          v-for="size in pizzaSizes"
          :key="size.id"
          name="diameter"
          :data="size"
          :isChecked="size.value === store.state.builder.selectedSize.value"
          @itemSelected="store.commit(SET_SIZE, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>

  import SelectorItem from '@/common/input/SelectorItem.vue';
  import {useStore} from 'vuex';
  import {SET_SIZE} from '@/store/modules/builder-mutation-types';

  export default {
    name: 'BuilderSize',
    components: {SelectorItem},
    props: {
      pizzaSizes: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      return {
        store,
        SET_SIZE,
      };
    },
  };
</script>

<style scoped>

</style>
