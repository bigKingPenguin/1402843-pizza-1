import {api} from '@/plugins/axios';
import {removeStorageData, saveDataInStorage} from '@/plugins/localStorage.service';
import {TOKEN} from '@/common/const/constants';
import {store} from '@/store/store';

export const authorise = async (params) => {
  await api.post('/login', params)
  .then(({data}) => saveDataInStorage(TOKEN, data.token))
  .catch(e => {
    alert(e.response.data.error.message);
    throw Error(e.response.data.error.message);
  });
};

export const logout = async () => {
  await api.delete('/logout')
  .then(() => {
    removeStorageData(TOKEN);
    store.commit('user/removeUserData');
  });
};
