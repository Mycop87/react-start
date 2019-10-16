import * as React from 'react';
import { observer } from 'mobx-react';
import spinnerStore from "../../stores/spinner-store";

@observer
class SpinnerComponent extends React.Component{
  public render() {
    return (spinnerStore.hasSpinner ? <div className='spinner'></div> : null);
  }
};
export default SpinnerComponent;
