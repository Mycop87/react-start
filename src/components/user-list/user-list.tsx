import * as React from 'react';
import { Component } from 'react';
import ReactTable from 'react-table';
import Modal from '../modal';
import UserForm from '../userForm';
import Button from '@material-ui/core/Button';

import 'react-table/react-table.css';

type IProps = {
  users: any;
  userStore: any;
}

type IState = {
  modalIsOpen: boolean; modalMode: 'EDIT' | 'CREATE' | null; editableUser: any;
}

export class UserListComponent extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      modalIsOpen:  false,
      modalMode:    null,
      editableUser: null,
    };
  }

  public onCloseModal () {
    this.setState({
      modalIsOpen: false,
    });
  }

  public onSaveUser () {
    this.props.userStore.saveUser(this.state.editableUser).then((a)=>{
      this.setState({modalIsOpen:false})
    })
  }

  private onCreateUser () {
    this.setState({
      modalIsOpen:  true,
      modalMode:    'CREATE',
      editableUser: this.props.userStore.createNewUser(),
    });
  }

  private openEditUserModal (user) {
    this.setState({
      modalIsOpen:  true,
      modalMode:    'EDIT',
      editableUser: user,
    });
  }
  public userChanged(user){
    this.setState({
      editableUser: user,
    })
  }

  public render () {
    const { users } = this.props;
    const data      = users.map(user => user);
    const columns   = [
      {
        Header:   'Email',
        accessor: 'model.email',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header:   'name',
        accessor: 'model.firstName',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header:   'phone',
        accessor: 'model.phone',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header: 'actions',
        Cell:   props => <span onClick={() => {this.props.userStore.deleteUser(props.original);}}>delete</span>,
      },
    ];

    return <div>
      <div className="buttons">
        <Button  color="primary" variant="contained" onClick={() => {this.onCreateUser();}}>Create new User</Button>
      </div>
      <ReactTable
        data={data}
        columns={columns}
      />
      <Modal
        isOpen={this.state.modalIsOpen}
        onClose={() => this.onCloseModal()}
        onDone={() => this.onSaveUser()}
        headerText={this.state.modalMode == 'EDIT' ? 'Edit User' : 'Create User'}
      >
        <UserForm user={this.state.editableUser} onChange={(ev)=>{this.userChanged(ev)}}/>
      </Modal>
    </div>;
  }
}

export default UserListComponent;
