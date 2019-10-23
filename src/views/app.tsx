import * as React from 'react';
import SpinnerComponent from '@/components/spinner';
import Menu from '@/components/menu';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Users from './Users';

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
          <Route path="/users" component={Users}/>
        </Switch>
      </div>
      <SpinnerComponent/>
      <ToastContainer autoClose={2000}/>
    </Router>;

  }
}
