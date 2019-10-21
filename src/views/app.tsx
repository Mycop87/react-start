import * as React from 'react';
import UserListComponent from '../components/user-list';
import SpinnerComponent from '../components/spinner';
import { ToastContainer } from 'react-toastify';
import Home from './home';
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
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/users" component={UserListComponent}/>
        </Switch>
      </div>
      <SpinnerComponent/>
      <ToastContainer autoClose={2000}/>
    </Router>;

  }
}
