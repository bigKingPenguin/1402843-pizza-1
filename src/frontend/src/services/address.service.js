import {api} from '@/plugins/axios';

export const getUserAddress = async () => {
  const {data} = await api.get('/addresses');
  return data;
};

export const removeAddress = async (id) => {
  await api.delete(`/addresses/${id}`);
};

export const setAddress = async (address) => {
  await api.post('/addresses', address);
};

export const editAddress = async (address, id) => {
  await api.put(`/addresses/${id}`, address);
};
