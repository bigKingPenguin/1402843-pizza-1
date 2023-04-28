import {api} from '@/plugins/axios';
import {store} from '@/store/store';

export const getUserData = async () => {
  await api.get('/whoAmI').then(({data}) => store.commit('user/getUserData', data)).catch((e) => {
    throw Error(e.response.data.error.message);
  });
};
