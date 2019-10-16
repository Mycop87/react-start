import axios  from 'axios';

export default {
  setupInterceptors: () => {
    axios.interceptors.response.use((response) => {
      return response.data;
    }, (err) => {
      if (err.response.data.error) {
        return Promise.reject(err.response.data.error);
      }
      return Promise.reject();
    });

    axios.interceptors.request.use((config) => {
      ///config.headers.authorization = `Bearer ${authService.token}`;
      return config;
    }, (err) => {
      return Promise.reject(err);
    });
  }
};
