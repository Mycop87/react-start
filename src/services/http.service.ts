import axios from 'axios';
import Interceptors from '../interceptors';
import spinnerStore from '../stores/spinner-store';

import { environment } from '../environments/environment';

Interceptors.setupInterceptors();

export class HttpService {

  public async get (url: string, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    const result = await axios.get(`${environment.API_URL}${url}`).finally(() => {
      hasSpinner && spinnerStore.finish();
    });
    return result;
  }

  public async post (url: string, body: any, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    const result = await axios.post(`${environment.API_URL}${url}`, body).finally(() => {
      hasSpinner && spinnerStore.finish();
    });
    return result;
  }

  public async delete (url: string, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    const result = await axios.delete(`${environment.API_URL}${url}`).finally(() => {
      hasSpinner && spinnerStore.finish();
    });
    return result;
  }

  public async put (url: string, body: any, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    const result = await axios.put(`${environment.API_URL}${url}`, body).finally(() => {
      hasSpinner && spinnerStore.finish();
    });
    return result;
  }
}

export default new HttpService();
