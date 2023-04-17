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
          <template v-if="getFillingElements.length">
            <div
              v-for="element in getFillingElements"
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

  export default {
    name: 'BuilderPizzaView',
    props: {
      pizzaDough: {
        type: Object,
        required: true,
      },
      pizzaSauce: {
        type: Object,
        required: true,
      },
      pizzaFilling: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        pizza_name: '',
        classNames: [],
      };
    },
    computed: {
      getFoundationClass() {
        return `pizza--foundation--${this.pizzaDough?.value ?? 'light'}-${this.pizzaSauce?.value ?? 'tomato'}`;
      },
      getFillingElements() {
        let classNames = [];
        for (let fil in this.pizzaFilling) {
          let componentClassName;
          if (this.pizzaFilling[fil]?.counter > 0) {
            componentClassName = `pizza__filling--${this.pizzaFilling[fil].value}`;
            if (this.pizzaFilling[fil].counter > 1) {
              componentClassName = `${componentClassName} pizza__filling--${this.pizzaFilling[fil].counter === 2 ? 'second' : 'third'}`;
            }
            classNames.push(componentClassName);
          }
        }
        return classNames;
      },
    },
    methods: {
      onDrop({dataTransfer}) {
        const addedIngredient = dataTransfer.getData(DATA_TRANSFER_TEXT_TYPE);
        if (addedIngredient) {
          emitter.emit(`add-${addedIngredient}`);
        }
      },
    },
  };
</script>

<style scoped>

</style>
