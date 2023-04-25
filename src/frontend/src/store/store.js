import {createStore} from 'vuex';
import builder from '@/store/modules/Builder';
import cart from '@/store/modules/Cart';

export const store = createStore({
  modules: {
    builder,
    cart,
  },
});
