import * as React from 'react';
import { Component } from 'react';
import { IUser } from '../../interfaces/user.interface';

type IProps = {
  users: IUser[];
}

export class UserListComponent extends Component<IProps, {}> {
  constructor (props: IProps) {
    super(props);
  }
  private  refFunc(node){
    console.log(node)
  }

  public render () {
    const { users } = this.props;
    return (<div>
      {users.map(userStore => <div key={userStore.user.get('email')}  onClick={()=>{userStore.deleteUser(userStore.user)}} ref={this.refFunc}>{userStore.user.get('email')}</div>)}
    </div>)
  }
}
export default UserListComponent
