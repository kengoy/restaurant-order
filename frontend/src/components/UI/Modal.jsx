import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useEffect } from 'react';

// Grey Background behind the modal over ray
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

// Modal overraied on top of the current screen
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// modal is appended in the element of id "overlays" placed in the body of index.html
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  // disable scroll for the screen behind the modal
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
