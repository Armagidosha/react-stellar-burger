import { useDispatch } from '../../utils/hooks';
import styles from './profileAnchors.module.css';
import { NavLink } from 'react-router-dom';
import { postLogout } from '../../services/actions/user';
import { path } from '../../utils/utils';

const ProfileAnchors = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(postLogout())
  }

  return (
    <ul className={styles.links_ul}>
      <li className={`${styles.link_li} text text_type_main-medium`}>
        <NavLink
          to={path.profile}
          end
          className={styles.link}>
          {({ isActive }) =>
            <p className={`${isActive ? styles.linkActive : ''} ${styles.linkText}`}>
              Профиль
            </p>
          }
        </NavLink>
      </li>
      <li className={`${styles.link_li} text text_type_main-medium`}>
        <NavLink
          to={path.profileOrders}
          className={styles.link}>
          {({ isActive }) =>
            <p className={`${isActive ? styles.linkActive : ''} ${styles.linkText}`}>
              История заказов
            </p>
          }
        </NavLink>
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