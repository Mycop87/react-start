import * as React from 'react';
import { Component } from 'react';
import { IUser } from '../../interfaces/user.interface';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

type IProps = {
  users: IUser[];
  userStore:any
}

export class UserListComponent extends Component<IProps, {}> {
  constructor (props: IProps) {
    super(props);
  }

  public onc(user){
    this.props.userStore.deleteUser(user)
  }

  public render () {
    const { users } = this.props;
    const data      = users.map(userStore => userStore.userData);
    const columns = [
      {
        Header:   'Email',
        accessor: 'email',
        Cell: props => <span  onClick={()=>{this.onc(props.original)}} >{props.value}</span>
      }, {
        Header:   'name',
        accessor: 'firstName',
      }, {
        Header:   'phone',
        accessor: 'phone',
      },
    ];
    return <ReactTable
      data={data}
      columns={columns}
    />;
  }
}

export default UserListComponent;
