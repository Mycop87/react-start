import * as React from 'react';
import authService from '../../services/auth.service';
import Button from '@material-ui/core/Button';
import {
  withRouter
} from 'react-router-dom'


class MenuComponent extends React.Component<any,{}>{
  private isShowMenu():boolean{
    return !!authService.token
  }

  private onLogout(){
    authService.logout()
    this.props.history.push('/')
  }

  public render() {
    return <div>{
      this.isShowMenu() &&   <Button onClick={() => this.onLogout()}>Logout</Button>}</div>
  }
};
export default withRouter(MenuComponent);
