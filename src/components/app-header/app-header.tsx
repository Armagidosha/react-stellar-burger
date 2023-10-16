import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import { path } from '../../utils/utils';
import styles from './app-header.module.css';

export default function AppHeader() {

  return (
    <header className={`${styles.header} pt-4 pb-4 text text_type_main-default`}>
      <nav className={styles.nav}>
        <div className={styles.nav_container}>
          <NavLink to={'/'} className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={isActive ? styles.active : styles.inactive}>
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink to={path.feed} end className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={isActive ? styles.active : styles.inactive}>
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to={'/'} className={styles.nav_link}>
            <Logo />
          </NavLink>
        </div>
        <NavLink to={path.profile} className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={isActive ? styles.active : styles.inactive}>
                Личный кабинет
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  )
}