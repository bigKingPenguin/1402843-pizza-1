<template>
  <div>
    <div class="content__constructor">
      <div
        class="pizza"
        :class="getFoundationClass">
        <div
          class="pizza__wrapper"
          @drop.stop="onDrop"
          @dragover.prevent
          @dragenter.prevent
        >
          <template v-if="getFillingClass.length">
            <div
              v-for="element in getFillingClass"
              class="pizza__filling"
              :class="element"
              :key="element"
            >
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {DATA_TRANSFER_TEXT_TYPE} from '@/common/const/constants';
  import emitter from '@/services/emitter';
  import {useStore} from 'vuex';
  import {computed} from 'vue';

  export default {
    name: 'BuilderPizzaView',
    setup() {
      const store = useStore();

      const selectedDough = computed(() => store.state.builder.selectedDough);
      const selectedSauce = computed(() => store.state.builder.selectedSauce);
      const selectedFilling = computed(() => store.state.builder.selectedFilling);

      const getFoundationClass = computed(() => `pizza--foundation--${selectedDough.value?.value}-${selectedSauce.value?.value}`);

      const getFillingClass = computed(() => {
        let classNames = [];
        for (let fil in selectedFilling.value) {
          let componentClassName;
          if (selectedFilling.value[fil]?.counter > 0) {
            componentClassName = `pizza__filling--${selectedFilling.value[fil].value}`;
            if (selectedFilling.value[fil].counter > 1) {
              componentClassName = `${componentClassName} pizza__filling--${selectedFilling.value[fil].counter === 2 ? 'second' : 'third'}`;
            }
            classNames.push(componentClassName);
          }
        }
        return classNames;
      });

      const onDrop = ({dataTransfer}) => {
        const addedIngredient = dataTransfer.getData(DATA_TRANSFER_TEXT_TYPE);
        if (addedIngredient) {
          emitter.emit(`add-${addedIngredient}`);
        }
      };

      return {
        getFoundationClass,
        getFillingClass,
        onDrop,
      };
    },
  };
</script>

<style scoped>

</style>
