import * as React from 'react';
import  UserListComponent  from '../components/user-list';
import  SpinnerComponent  from '../components/spinner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { observer } from "mobx-react";


@observer
export default class App extends React.Component<{},{}>{
  constructor(props) {
    super(props);
  };

  public render() {
    return  <div>
      <SpinnerComponent />
      <UserListComponent />
      <ToastContainer autoClose={2000} />
    </div>
  }
}
