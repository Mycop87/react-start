import httpService from './http.service';

export const userService = {
  getUsers:() => {
    return  httpService.get('users')
  },

  deleteUser:(id) => {
    return  httpService.delete(`users?id=${id}`)
  },

  updateUser:(user) => {
    return  httpService.put(`users`, user)
  },

  createUser:(user) => {
    return  httpService.post(`users`, user)
  }
}
