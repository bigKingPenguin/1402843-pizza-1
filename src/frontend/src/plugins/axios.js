import axios from 'axios';
import {getStorageData} from '@/plugins/localStorage.service';
import {TOKEN} from '@/common/const/constants';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
});

api.interceptors.request.use((config) => {
  const token = getStorageData(TOKEN);
  const authHeader = token ? `Bearer ${token}` : '';
  const copyConfig = {...config};
  if (copyConfig.headers) {
    copyConfig.headers.Authorization = authHeader;
  } else {
    copyConfig.headers = {Authorization: authHeader};
  }
  return copyConfig;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export {api};
