import httpService from './http.service';

export class AuthService {

  public get token(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public login(email: string, password: string ) {
    return httpService.post(`auth/login`, {
      email,
      password,
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
