import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, memo } from 'react';

const modalRoot = document.getElementById('modal');

const Modal = memo(({ children, toggleModal }) => {

  const modalOverlayRef = useRef(null)

  const handleButtonClose = (evt) => {
    if (evt.target) {
      toggleModal()
    }
  }

  const handleClickClose = (evt) => {
    console.log(modalOverlayRef.current)
    if (evt.target === modalOverlayRef.current) {
      toggleModal()
    }
  }

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        toggleModal()
      }
    }
    
    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('click', handleClickClose)
    }
  })

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
  toggleModal: PropTypes.func.isRequired,
};

export default Modal