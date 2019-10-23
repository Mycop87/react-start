import axios from 'axios';
import Interceptors from '@/interceptors';
import spinnerStore from '@/stores/spinner-store';

import { environment } from '@/environments/environment';

Interceptors.setupInterceptors();

export class HttpService {
  public async get (url: string, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();

    return await axios.get(`${environment.API_URL}${url}`)
                      .then(res => <any> res)
                      .finally(() => hasSpinner && spinnerStore.finish());
  }

  public async post (url: string, body: any, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    return await axios.post(`${environment.API_URL}${url}`, body)
                      .then(res => <any> res)
                      .finally(() => {
                        hasSpinner && spinnerStore.finish();
                      });
  }

  public async delete (url: string, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    return await axios.delete(`${environment.API_URL}${url}`)
                      .then(res => <any> res)
                      .finally(() => {
                        hasSpinner && spinnerStore.finish();
                      });
  }

  public async put (url: string, body: any, hasSpinner: boolean = true) {
    hasSpinner && spinnerStore.add();
    return await axios.put(`${environment.API_URL}${url}`, body)
                      .then(res => <any> res)
                      .finally(() => {
                        hasSpinner && spinnerStore.finish();
                      });
  }
}

export default new HttpService();
