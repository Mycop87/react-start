import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as ReactModal from 'react-modal';

ReactModal.setAppElement('#app')

type IProps = {
  isOpen:boolean;
  onClose: Function;
  onDone: Function;
  headerText?:string;

  [index:string]:any;
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const  ModalComponent = (props:IProps) => {

  const closeModal = () => {
   props.onClose();
  }

  const  onSave = () => {
    props.onDone();
  }

    return (
      <ReactModal
        isOpen={props.isOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        { props.headerText ? <header>{props.headerText}</header> : null }
        {props.children}
        <Button onClick={closeModal}>close</Button>
        <Button color="primary" variant="contained" onClick={onSave}>save</Button>
      </ReactModal>);
};
export default ModalComponent;
