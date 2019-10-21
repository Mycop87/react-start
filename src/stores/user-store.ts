import { observable, action, computed } from 'mobx';
import { userService } from '../services/user.service';
import messageService from '../services/message.service';
import { IUser } from '../interfaces/user.interface';

class User {
  @observable data = observable.map();

  constructor (userData) {
    this.data.merge({
      email:     '',
      firstName: '',
      lastName:  '',
      phone:     '',
      isDefault: false,
      id:        null,
      password:  '', ...userData,
    });
  }


  @computed get model () {
    const result = {} as any;
    ([...this.data]).forEach(field => {
      result[field[0]] = field[1];
    });
    return result;
  }
}

class UserStore {
  @observable users: User[];

  constructor () {
    this.users = [];
    this.fetch();
  }

  getUsers () {
    return this.users;
  }

  @action fetch () {
    if (this.users.length) {
      return;
    }
    userService.getUsers()
               .then((users: IUser[] | any) => this.putUsers(users));
  }

  @action('createNewUser') createNewUser (user?) {
    return new User(user);
  }

  @action('deleteUser') deleteUser (user: User) {
    userService.deleteUser(user.data.get('id')).then(() => {
      messageService.success('user was deleted');
      this.users = this.users.filter(usr => usr.model.id !== user.model.id);
    }).catch(res => {
      messageService.error(res.message);
    });
  }

  @action('saveUser') saveUser (userStore: User) {
    const user = userStore.model;
    if (user.id) {
      return new Promise(resolve => {
        userService.updateUser(user).then((res) => {
          const users = this.users.map(usr => {
            if (usr.data.get('id') === user.id) {
              return userStore;
            }
            return usr;
          });
          this.users  = users;
          return resolve(res);
        });
      });
    }
    return new Promise(resolve => {
      userService.createUser(user).then((res) => {
        this.users.push(new User(res));
        return resolve(res);
      });
    });
  }

  @action('putUsers') putUsers (users: IUser[]) {
    let userArray = [];

    users.forEach(user => {
      userArray.push(new User(user));
    });

    this.users = userArray;
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
