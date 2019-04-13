import axios from 'axios';

const instance = axios.create({});

instance.interceptors.request.use((request) => {
  console.log('[axios] request', request.url);
  return request;
});

instance.interceptors.response.use((response) => {
  console.log('[axios] response', response.data);
  return response;
});

export default instance;
