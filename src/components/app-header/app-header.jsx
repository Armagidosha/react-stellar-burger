import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom';
import { path } from '../../utils/utils';
import styles from './app-header.module.css';

export default function AppHeader() {
  const url = useLocation().pathname;

  const isProfilePage = [
    path.login,
    path.profile,
    path.forgot,
    path.recover,
    path.register
  ].some(substring => url.startsWith(substring));

  return (
    <header className={`${styles.header} pt-4 pb-4 text text_type_main-default`}>
      <nav className={styles.nav}>
        <div className={styles.nav_container}>
          <Link to={'/'} className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            <BurgerIcon type={url === '/' ? 'primary' : 'secondary'} />
            <span className={url === '/' ? styles.active : styles.inactive}>
              Конструктор
            </span>
          </Link>
          <Link to={path.feed} className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            <ListIcon type={url.startsWith(path.feed) ? 'primary' : 'secondary'} />
            <span className={url.startsWith(path.feed) ? styles.active : styles.inactive}>
              Лента заказов
            </span>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to={path.profile} className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
          <ProfileIcon type={isProfilePage ? 'primary' : 'secondary'} />
          <span className={isProfilePage ? styles.active : styles.inactive}>
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  )
}