import * as React from 'react';
import authService from '@/services/auth.service';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  withRouter,
} from 'react-router-dom';
import './style.scss';

class MenuComponent extends React.Component<any, {}> {
  private isShowMenu (): boolean {
    return !!authService.token;
  }

  private onLogout (): void {
    authService.logout();
    this.props.history.push('/');
  }

  public render () {
    return <div className='top-menu'>
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div>
            { this.isShowMenu() && <div  className='user-block'>
                <Avatar>OP</Avatar><Button color="inherit" onClick={() => this.onLogout()}>Logout</Button></div> }
            </div>

        </Toolbar>
      </AppBar>
    </div>
  }
};
export default withRouter(MenuComponent);
