import { observable, action, computed } from 'mobx';
import { userService } from '../services/user.service';
import  messageService  from '../services/message.service';
import { IUser } from '../interfaces/user.interface';

class User {
  @observable user = observable.map();

  constructor (userData = {}) {
    this.user.merge(userData);
  }

  @computed get userData (): IUser {
    return {
      email:     this.user.get('email'),
      firstName: this.user.get('firstName'),
      lastName:  this.user.get('lastName'),
      phone:     this.user.get('phone'),
      isDefault: this.user.get('isDefault'),
      id:        this.user.get('id'),
      store:     this,
    };
  }
}

class UserStore {
  @observable users;

  constructor () {
    this.users = [];
    this.fetch();
  }

  getUsers () {
    return this.users;
  }

  @action fetch () {
    userService.getUsers()
               .then(users => this.putUsers(users));
  }

  @action('deleteUser') deleteUser(user){
    userService.deleteUser(user).then(() => {
      messageService.showMessage('SUCCESS','user was deleted')
      this.users = this.users.toJS().filter(usr=> usr.userData.id !== user.id);
    }).catch(res => {
      messageService.showMessage('ERROR',res.message)
    });
  }

  @action('putUsers') putUsers (users) {
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
