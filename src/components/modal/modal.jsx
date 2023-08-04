import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const modalRoot = document.getElementById('modal');

const Modal = memo(({ children }) => {
  const modalOverlayRef = useRef(null);
  const dispatch = useDispatch()
  const toggleModal = useCallback(() => {
    dispatch({
      type: 'CLOSE'
    })
  }, [dispatch])

  const handleButtonClose = () => {
    toggleModal();
  };

  const handleEscClose = useCallback((evt) => {
    if (evt.key === 'Escape') {
      toggleModal();
    }
  }, [toggleModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [handleEscClose]);

  return createPortal(
    <>
      <div className={styles.container}>
        <span className={styles.close_icon} onClick={evt => handleButtonClose(evt)}><CloseIcon /></span>
        {children}
      </div>
      <ModalOverlay ref={modalOverlayRef} close={toggleModal} />
    </>,
    modalRoot
  )
})

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal