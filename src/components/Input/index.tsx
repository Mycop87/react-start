import * as React from 'react';
import TextField from '@material-ui/core/TextField';
type IProps = {
  value: string;
  label: string;
  [index: string]: any;
}

const Input: React.SFC<IProps> = (props) => {

  return <div>
    <TextField
      label={props.label}
      className={'textField dense'}
      margin="dense"
      InputProps={{
        ...props
      }}
     value={props.value? props.value : ''}/>
  </div>;
};


export default Input;
