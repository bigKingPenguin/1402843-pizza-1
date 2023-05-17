import {api} from '@/plugins/axios';

export const getAdditionalProducts = async () => {
  const {data} = await api.get('/misc');
  return data;
};

export const submitOrder = async (data) => {
  await api.post('/orders', data);
};
