import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { forwardRef } from 'react';

const ModalOverlay = forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.modal_overlay} onClick={props.close}></section>
  );
});

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
