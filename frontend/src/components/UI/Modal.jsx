import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useEffect } from 'react';

/**
 * Grey full screen background component behind the modal overlay
 * @param {Object} props
 * @param {Function} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element}
 */
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

/**
 * Modal overlay component overlaid on top of the current screen
 * @param {Object} props
 * @returns {JSX.Element}
 */
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Modal is appended in the element of id "overlays" placed in the body of index.html
const portalElement = document.getElementById('overlays');

/**
 * Modal component that has a backdrop and a modal overlay
 * @param {Object} props - The props object that include children components.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element}
 */
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
