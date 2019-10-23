import * as React from 'react';
import {
  withRouter,
} from 'react-router-dom';

import userStore from "@/stores/user-store";
import UserListComponent from '@/components/user-list';
import Button from '@material-ui/core/Button';
import Modal from '@/components/modal';
import UserForm from '@/components/userForm';

type IState = {
  modalIsOpen: boolean;
  newUser: any;
}

class Users extends React.Component<{}, IState> {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen:  false,
      newUser: null,
    };
  }
  public userChanged(user){
    this.setState({
      newUser: user,
    })
  }

  private onCreateUser () {
    this.setState({
      modalIsOpen:  true,
      newUser: userStore.createNewUser(),
    });
  }

  private onCloseModal () {
    this.setState({
      modalIsOpen:  false,
      newUser: null,
    });
  }

  private onSaveUser () {
    userStore.saveUser(this.state.newUser).then((a)=>{
      this.setState({modalIsOpen:false});
    })
  }

  public render() {
    return <div>
      <div className="buttons">
        <Button color="primary" variant="contained" onClick={() => {this.onCreateUser();}}>Create new User</Button>
      </div>
      <UserListComponent/>
      <Modal
        isOpen={this.state.modalIsOpen}
        onClose={() => this.onCloseModal()}
        onDone={() => this.onSaveUser()}
        headerText='Create User'
      >
        <UserForm user={this.state.newUser} onChange={(ev)=>{this.userChanged(ev)}}/>
      </Modal>
    </div>
  }
}
export default withRouter(Users);
