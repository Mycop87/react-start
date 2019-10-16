import * as React from 'react';
import { Component } from 'react';

type IProps = {
  [index:string]: any
}

type IState = {
  [index:string]: any
}

export default (OriginalComponent) => class WrapperComponent extends Component<IProps,IState>{
  render() {
    return <OriginalComponent  {...this.props}/>
  }
}
