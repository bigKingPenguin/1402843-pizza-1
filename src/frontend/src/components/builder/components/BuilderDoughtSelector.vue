<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <!--      TODO: в pizza.json временно добавлен value для dough-->
        <SelectorItem
          v-for="dough in pizzaDough"
          :key="dough.id"
          name="dough"
          :data="dough"
          :isChecked="dough.value === store.state.builder.selectedDough.value"
          @itemSelected="saveSelectedDough"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SelectorItem from '@/common/input/SelectorItem.vue';
  import {useStore} from 'vuex';
  import {DOUGH} from '@/common/const/constants';
  import {saveDataInStorage} from '@/plugins/localStorage.service';

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

      const saveSelectedDough = (event) => {
        store.commit('builder/setPizzaDough', event);
        saveDataInStorage(DOUGH, event.value);
      };

      return {
        store,
        saveSelectedDough,
      };
    },
  };
</script>

<style scoped>

</style>
