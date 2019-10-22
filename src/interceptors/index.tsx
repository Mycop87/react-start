import axios  from 'axios';
import authService from '../services/auth.service';
import { environment } from '../environments/environment';
export default {
  setupInterceptors: () => {
    axios.interceptors.response.use((response) => {
      return response.data;
    }, (err) => {
      if (err.response.data.error) {

        if(err.response.data.error.code && err.response.data.error.code ===1000){
          authService.logout();
          window.location.replace(`${environment.DEFAULT_URL}login`)
        }
        return Promise.reject(err.response.data.error);
      }
      return Promise.reject();
    });

    axios.interceptors.request.use((config) => {
      if(!config.url.includes('api/auth/login')){
        config.headers.authorization = `Bearer ${authService.token}`;
      }
      return config;
    }, (err) => {
      return Promise.reject(err);
    });
  }
};
