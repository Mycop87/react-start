export {};
import { IUser } from '../interfaces/user.interface';
const DataBaseService = require('../services/data-base.service');
const AuthService = require('../services/auth.service');

class UserService {
  async getUserById(id: string): Promise<IUser> {
    const result = await DataBaseService.getDocument('users', { '_id': id });
    return result;
  }

  async getUsers(): Promise<IUser[]>  {
    const users = await DataBaseService.getDocuments('users');
    return users.map((user: any) => {
      const result = {
        ...user,
        password: '',
        id:user._id,
      }
      delete result._id;
      return result;
    });
  }

  async createUser (data: any): Promise<any> {
    const existUser = await DataBaseService.getDocument('users', { email: data.email });
    if (existUser) {
      return {
        error: {
          status:  400,
          message: 'user with target user name already exist',
        },
      };
    }
    const hash   = await AuthService.getHash(data.password);
    const result = await DataBaseService.insertDocument('users', {
      ...data,
      password:  hash,
      isDefault: false,
    });
    const id =  result._id;
    delete result._id;
    return {
      ...result,
      id,
      password: '',
    };
  }

  async updateUser(searchCriteria: any, data: any) {
    const result = await DataBaseService.updateDocument('users', searchCriteria, data);
    return result
  }

  async deleteUser(data: any) {
    const result = await DataBaseService.deleteDocument('users', data);
    return result;
  }

  async getUser(searchCriteria: any): Promise<IUser> {
    const user = await DataBaseService.getDocument('users', searchCriteria);
    return user;
  }

}

module.exports = new UserService();
