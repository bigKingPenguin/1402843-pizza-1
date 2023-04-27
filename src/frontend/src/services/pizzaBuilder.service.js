import {api} from '@/plugins/axios';

export const getDough = async () => {
  const {data} = await api.get('/dough');
  return data;
};

export const getSizes = async () => {
  const {data} = await api.get('/sizes');
  return data;
};

export const getSauces = async () => {
  const {data} = await api.get('/sauces');
  return data;
};

export const getIngredients = async () => {
  const {data} = await api.get('/ingredients');
  return data;
};

export const getPizzaData = async () => {
  const pizzaData = {};
  await Promise.all([getDough(), getSizes(), getSauces(), getIngredients()]).then(data => {
    pizzaData.dough = data[0];
    pizzaData.sizes = data[1];
    pizzaData.sauce = data[2];
    pizzaData.filling = data[3];
  });
  return pizzaData;
};
