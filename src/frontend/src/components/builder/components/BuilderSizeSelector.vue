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
          @itemSelected="saveSelectedSize"
        />
      </div>
    </div>
  </div>
</template>

<script>

  import SelectorItem from '@/common/input/SelectorItem.vue';
  import {useStore} from 'vuex';
  import {saveDataInStorage} from '@/plugins/localStorage.service';
  import {SIZE} from '@/common/const/constants';

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

      const saveSelectedSize = (event) => {
        store.commit('builder/setPizzaSize', event);
        saveDataInStorage(SIZE, event.value);
      };

      return {
        store,
        saveSelectedSize,
      };
    },
  };
</script>

<style scoped>

</style>
