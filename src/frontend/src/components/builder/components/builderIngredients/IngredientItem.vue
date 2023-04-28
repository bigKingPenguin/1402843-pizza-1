<template>
<span
  :class="`filling filling--${ingredient.value}`"
  :draggable="isDraggable"
  @dragstart.self="onDrag"
  @dragover.prevent
  @dragenter.prevent
>
     {{ ingredient.name }}
   </span>
  <ItemCounter
    counterType="ingridients"
    :defaultCounter="counter"
    :itemMaximumCount="FILLING_MAXIMUM_COUNT"
    @counterPlus="onCounterChange(counter + 1)"
    @counterMinus="onCounterChange(counter - 1)"
  />
</template>

<script>
  import ItemCounter from '@/common/input/ItemCounter.vue';
  import {useStore} from 'vuex';
  import {computed, onBeforeUnmount, onMounted} from 'vue';
  import {DATA_TRANSFER_TEXT_TYPE, FILLING_MAXIMUM_COUNT} from '@/common/const/constants';
  import emitter from '@/plugins/emitter';
  import {removeStorageData, saveDataInStorage} from '@/plugins/localStorage.service';

  export default {
    name: 'IngredientItem',
    components: {ItemCounter},
    props: {
      ingredient: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();

      const counter = computed(() => store.state.builder.selectedFilling[props.ingredient.value]?.counter ?? 0);

      const onCounterChange = (event) => {
        store.commit('builder/addFilling', {...props.ingredient, counter: event});
        if (event === 0) {
          removeStorageData(props.ingredient.value);
        } else saveDataInStorage(props.ingredient.value, event);
      };

      const isDraggable = computed(() => counter.value !== FILLING_MAXIMUM_COUNT);

      const onDrag = ({dataTransfer}) => {
        dataTransfer.setData(DATA_TRANSFER_TEXT_TYPE, props.ingredient.value);
      };

      const counterPlus = () => {
        onCounterChange(counter.value + 1);
      };

      onMounted(() => emitter.on(`add-${props.ingredient.value}`, counterPlus));

      onBeforeUnmount(() => emitter.off(`add-${props.ingredient.value}`, counterPlus));

      return {
        store,
        counter,
        onCounterChange,
        isDraggable,
        onDrag,
        FILLING_MAXIMUM_COUNT,
      };
    },
  };
</script>

<style scoped>

</style>
