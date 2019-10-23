import * as React from 'react';
import Input from '@/components/Input';
import Button from '@material-ui/core/Button';
import authService from '@/services/auth.service';
import {
  withRouter,
} from 'react-router-dom';

type IState = {
  email: string; password: string;
}


class Login extends React.Component<any, IState> {
  constructor (props) {
    super(props);
    this.state = {
      email:    '',
      password: '',
    };
  };

  onChangeEmail (ev) {
    this.setState({
      email: ev.target.value,
    });
  }

  onChangePass (ev) {
    this.setState({
      password: ev.target.value,
    });
  }

  onLogin (e) {
    e.preventDefault();
    e.stopPropagation();
    authService.login(this.state.email, this.state.password).then((res) => {
      this.props.history.push('/users');
    }, (e) => {
    });
  }

  public render () {
    return <form onSubmit={(e)=>{this.onLogin(e)}}>
      <div className="lvl">
        <Input type='email' label={'UserName'} name={'email'} onChange={(ev) => this.onChangeEmail(ev)} value={this.state.email}/>
      </div>
      <div className="lvl">
        <Input type='password' label={'Password'} name={'password'} onChange={(ev) => this.onChangePass(ev)}
               value={this.state.password}/>
      </div>
      <div className="lvl">
        <Button type='submit' onClick={(e) => this.onLogin(e)}>Login</Button>
      </div>

    </form>;
  }
}

export default withRouter(Login);
