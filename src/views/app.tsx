import * as React from 'react';
import UserListComponent from '../components/user-list';
import SpinnerComponent from '../components/spinner';
import Menu from '../components/menu';
import { ToastContainer } from 'react-toastify';
import Login from './Login';

import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

export default class App extends React.Component<{}, {}> {
  constructor (props) {
    super(props);
  };

  public render () {
    return <Router>
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/users" component={UserListComponent}/>
        </Switch>
      </div>
      <SpinnerComponent/>
      <ToastContainer autoClose={2000}/>
    </Router>;

  }
}
