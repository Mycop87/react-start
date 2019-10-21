import * as React from 'react';
import { Component } from 'react';
import { IUser } from '../../interfaces/user.interface';
import Input from '../Input';
import userStore from '../../stores/user-store';

import 'react-table/react-table.css';

type IProps = {
  user: IUser; onChange: Function;
}

type IState = {
  user: any;
}

export class UserForm extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      user: userStore.createNewUser({ ...this.props.user.model }),
    };

  }

  onFieldChange (ev, field) {
    const user = this.state.user;
    user.data.set(field, ev.target.value);
    this.setState({
      user,
    });

    this.props.onChange(user);
  }

  public render () {
    const user = this.state.user.model;
    return <form>
      <div className="lvl">
        <Input type='email' readOnly={user.isDefault || user.id} label={'Email'} onChange={(ev) => {this.onFieldChange(ev, 'email');}} value={user.email}/>
      </div>
      {!user.id ? <div className="lvl">
        <Input type='password' label={'Password'} onChange={(ev) => {this.onFieldChange(ev, 'password');}}
               value={user.password}/>
      </div> : null
      }
      <div className="lvl">
        <Input type='text' label={'Name'} onChange={(ev) => {this.onFieldChange(ev, 'firstName');}}
               value={user.firstName}/>
      </div>
      <div className="lvl">
        <Input type='text' label={'LastName'} onChange={(ev) => {this.onFieldChange(ev, 'lastName');}}
               value={user.lastName}/>
      </div>
      <div className="lvl">
        <Input type='text' label={'Phone'} onChange={(ev) => {this.onFieldChange(ev, 'phone');}} value={user.phone}/>
      </div>

    </form>;
  }
}

export default UserForm;
