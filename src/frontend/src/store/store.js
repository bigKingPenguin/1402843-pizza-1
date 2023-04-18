import {createStore} from 'vuex';
import builder from '@/store/modules/Builder';

export const store = createStore({
  modules: {
    builder,
  },
});
