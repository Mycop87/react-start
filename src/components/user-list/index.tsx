import * as React from 'react';
import { observer } from 'mobx-react';
import userStore from "@/stores/user-store";
import UserList from '@/components/user-list/user-list';

@observer
class UserListComponent extends React.Component{
  public render() {
    return (<UserList
        users={userStore.getUsers()}
        userStore={userStore}
      />);
  }
};
export default UserListComponent;
