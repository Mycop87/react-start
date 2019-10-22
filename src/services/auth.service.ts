import httpService from './http.service';
import messageService from './message.service';

export class AuthService {

  public get token(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public login(email: string, password: string ) {
    return httpService.post(`auth/login`, {
      email,
      password,
    }).then((res:any)=>{
        this.setToken(res.token)
        return res
    },(error) => {
      messageService.error(error.message)
      return Promise.reject(error)
    });
  }

  public logout(): void {
    window.sessionStorage.removeItem('token');
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem('token', token);
  }
}

export default new AuthService()
