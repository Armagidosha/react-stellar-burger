import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useCallback, FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modal') as HTMLDivElement;

const Modal: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const modalOverlayRef = useRef(null);
  const toggleModal = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleButtonClose = () => {
    toggleModal();
  };

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        toggleModal();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  return createPortal(
    <>
      <div className={styles.container}>
        <span className={styles.close_icon} onClick={() => handleButtonClose()}><CloseIcon type='primary'/></span>
        {children}
      </div>
      <ModalOverlay ref={modalOverlayRef} close={toggleModal} />
    </>,
    modalRoot
  )
}

export default Modal