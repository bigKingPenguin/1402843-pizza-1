<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>
    <Radio
      v-for="sauce in pizzaSauce"
      :key="sauce.id"
      class="ingridients__input"
      name="sauce"
      :data="sauce"
      :isChecked="sauce.value === store.state.builder.selectedSauce.value"
      @itemSelected="saveSelectedSauce"
    />
  </div>
</template>

<script>

  import Radio from '@/common/input/Radio.vue';
  import {useStore} from 'vuex';
  import {saveDataInStorage} from '@/plugins/localStorage.service';
  import {SAUCE} from '@/common/const/constants';

  export default {
    name: 'BuilderIngredientsSauce',
    components: {Radio},
    props: {
      pizzaSauce: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const store = useStore();

      const saveSelectedSauce = (event) => {
        store.commit('builder/setPizzaSauce', event);
        saveDataInStorage(SAUCE, event.value);
      };

      return {
        store,
        saveSelectedSauce,
      };
    },
  };
</script>

<style scoped>

</style>
