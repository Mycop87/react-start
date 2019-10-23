import * as React from 'react';
import { Component } from 'react';
import ReactTable from 'react-table';
import Typography from '@material-ui/core/Typography';
import Modal from '@/components/modal';
import UserForm from '@/components/userForm';
import Button from '@material-ui/core/Button';

import 'react-table/react-table.css';

type IProps = {
  users: any; userStore: any;
}

type IState = {
  modalIsOpen: boolean; editableUser: any;
}

export class UserListComponent extends Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      modalIsOpen:  false,
      editableUser: null,
    };
  }

  public onCloseModal () {
    this.setState({
      modalIsOpen: false,
    });
  }

  public onSaveUser () {
    this.props.userStore.saveUser(this.state.editableUser).then((a) => {
      this.setState({ modalIsOpen: false });
    });
  }

  private openEditUserModal (user) {
    this.setState({
      modalIsOpen:  true,
      editableUser: user,
    });
  }

  public userChanged (user) {
    this.setState({
      editableUser: user,
    });
  }

  public render () {
    const { users } = this.props;
    const data      = users.map(user => user);
    const columns   = [
      {
        Header:    <Typography variant="body2" gutterBottom>Email</Typography>,
        accessor: 'model.email',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header: <Typography variant="body2" gutterBottom>Name</Typography>,
        accessor: 'model.firstName',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header:   <Typography variant="body2" gutterBottom>Phone</Typography>,
        accessor: 'model.phone',
        Cell:     props => <span onClick={() => {this.openEditUserModal(props.original);}}>{props.value}</span>,
      }, {
        Header:  <Typography variant="body2" gutterBottom>Actions</Typography>,
        sortable: false,
        Cell:     props => <Button onClick={() => {this.props.userStore.deleteUser(props.original);}}>delete</Button>,
      },
    ];

    return <div>
      <ReactTable
        data={data}
        columns={columns}
      />
      <Modal
        isOpen={this.state.modalIsOpen}
        onClose={() => this.onCloseModal()}
        onDone={() => this.onSaveUser()}
        headerText='Edit User'
      >
        <UserForm user={this.state.editableUser} onChange={(ev) => {this.userChanged(ev);}}/>
      </Modal>
    </div>;
  }
}

export default UserListComponent;
