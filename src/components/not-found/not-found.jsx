import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export const NotFound404 = () => {
  return (
    <section className={styles.container}>
      <span className={`${styles.error} text_type_digits-large pt-20`}>404</span>
      <span className={`${styles.sentence} text_type_main-default`}>Нужный человек не в том месте может перевернуть мир.</span>
      <Link to={'/'} className={`${styles.link} text_type_main-default mt-4`}>На главную</Link>
    </section>
  )
}