import httpService from './http.service';

export const userService = {
  getUsers:() => {
    return  httpService.get('users')
  },

  deleteUser:(user) => {
    return  httpService.delete(`users?id=${user.id}`)
  }
}
