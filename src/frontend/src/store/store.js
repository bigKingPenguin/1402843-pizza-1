import {createStore} from 'vuex';
import builder from '@/store/modules/Builder';
import cart from '@/store/modules/Cart';
import common from '@/store/modules/Common';
import user from '@/store/modules/User';

export const store = createStore({
  modules: {
    builder,
    cart,
    common,
    user,
  },
});
