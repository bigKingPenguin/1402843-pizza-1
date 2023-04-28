export const getStorageData = (key) => {
  return localStorage.getItem(key);
};

export const saveDataInStorage = (key, data) => {
  localStorage.setItem(key, data);
};

export const removeStorageData = (key) => {
  localStorage.removeItem(key);
};
