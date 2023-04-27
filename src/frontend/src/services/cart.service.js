import {api} from '@/plugins/axios';

export const getAdditionalProducts = async () => {
  const {data} = await api.get('/misc');
  return data;
};
