import * as React from 'react';
import { observer } from 'mobx-react';
import spinnerStore from "@/stores/spinner-store";
import CircularProgress from '@material-ui/core/CircularProgress';
import  "./style.scss";

@observer
class SpinnerComponent extends React.Component{
  public render() {
    return (spinnerStore.hasSpinner ? <div className='spinnerCurtain'><CircularProgress  /></div> : null);
  }
}

export default SpinnerComponent;
