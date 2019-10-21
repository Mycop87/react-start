import * as React from 'react';
import Input from '../components/Input';
import Button from '@material-ui/core/Button';
import authService from '../services/auth.service';

type IState = {
  email: string; password: string;
}


export default class Login extends React.Component<{}, IState> {
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

  onLogin () {
    authService.login(this.state.email, this.state.password).then((res) => {

    });
  }

  public render () {
    return <div>
      <div className="lvl">
        <Input type='email' label={'UserName'} onChange={(ev) => this.onChangeEmail(ev)} value={this.state.email}/>
      </div>
      <div className="lvl">
        <Input type='password' label={'Password'} onChange={(ev) => this.onChangePass(ev)}
               value={this.state.password}/>
      </div>
      <div className="lvl">
        <Button onClick={() => this.onLogin()}>Login</Button>
      </div>

    </div>;
  }
}
