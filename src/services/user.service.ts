import httpService from './http.service';
import { IUser } from '../interfaces/user.interface';

export const userService = {
  getUsers:(): Promise<IUser[]> => {
    return  httpService.get('users').then(res =>{
      return <IUser[]>res
    })
  },

  deleteUser:(id) => {
    return  httpService.delete(`users?id=${id}`)
  },

  updateUser:(user: IUser): Promise<IUser> => {
    return  httpService.put(`users`, user).then(res =>{
      return <IUser>res
    })
  },

  createUser:(user: IUser): Promise<IUser> => {
    return  httpService.post(`users`, user).then(res =>{
      return <IUser>res
    })
  }
}
