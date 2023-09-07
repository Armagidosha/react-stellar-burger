import { useDispatch } from 'react-redux';
import styles from './profileAnchors.module.css';
import { Link, useLocation } from 'react-router-dom';
import { postLogout } from '../../services/actions/user';

const ProfileAnchors = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(postLogout())
  }

  return (
    <ul className={styles.links_ul}>
    <li className={`${styles.link_li} text text_type_main-medium`}>
      <Link
        to={'/profile'}
        className={`${styles.link} ${location === '/profile' ? styles.linkActive : ''}`}>
        Профиль
      </Link>
    </li>
    <li className={`${styles.link_li} text text_type_main-medium`}>
      <Link
        to={'/profile/orders'}
        className={`${styles.link} ${location === '/profile/orders' ? styles.linkActive : ''}`}>
        История заказов
      </Link>
    </li>
    <li className={`${styles.link_li}`}>
      <button onClick={handleLogout} className={`${styles.logoutButton} ${styles.link} text text_type_main-medium`}>
        Выход
      </button>
    </li >
  </ul>
  )
}

export default ProfileAnchors;