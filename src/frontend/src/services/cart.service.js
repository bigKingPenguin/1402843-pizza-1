import {api} from '@/plugins/axios';

export const getAdditionalProducts = async () => {
  const {data} = await api.get('/misc');
  return data;
};

export const getUserAddress = async () => {
  const {data} = await api.get('/addresses');
  return data;
}
// На потом:

// export const removeAddress = async () => {
//   await api.delete('/addresses/3')
// }
//
// export const setAddress = async () => {
//   await api.post('/addresses', {
//     "name": "home1",
//     "userId": "21fe2246-72ea-4303-96a4-717ec19d94c7",
//     "street": "street1",
//     "building": "1",
//     "flat": "2",
//     "comment": "blabla"
//   })
// }

export const submitOrder = async (data) => {
  await api.post('/orders', data)
}
