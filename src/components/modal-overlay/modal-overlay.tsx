import styles from './modal-overlay.module.css';
import { LegacyRef, forwardRef } from 'react';

type Overlay = {
  close: () => void
  ref: LegacyRef<HTMLElement>
}

const ModalOverlay = forwardRef<HTMLElement, Overlay>(( props, ref ) => {

  return (
    <section ref={ref} className={styles.modal_overlay} onClick={props.close}></section>
  );
});

export default ModalOverlay;
