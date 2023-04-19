<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <!--                  TODO: указать дефолтные значения для v-model-->
        <!--      TODO: в pizza.json временно добавлен value для dough-->
        <SelectorItem
          v-for="dough in pizzaDough"
          :key="dough.id"
          name="dough"
          :data="dough"
          @itemSelected="store.commit(SET_DOUGH, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SelectorItem from '@/common/input/SelectorItem.vue';
  import {useStore} from 'vuex';
  import {SET_DOUGH} from '@/store/mutation-types';

  export default {
    name: 'BuilderDought',
    components: {SelectorItem},
    props: {
      pizzaDough: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      return {
        store,
        SET_DOUGH,
      };
    },
  };
</script>

<style scoped>

</style>
