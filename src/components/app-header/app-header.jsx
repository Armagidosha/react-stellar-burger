import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4 text text_type_main-default`}>
      <nav className={styles.nav}>
        <div className={styles.nav_container}>
          <div className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            <BurgerIcon type="primary" />
            <a className={styles.link} href="#">Конструктор</a>
          </div>
          <div className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
            <ListIcon type="secondary" />
            <a className={`${styles.link} ${styles.active}`} href="#">Лента заказов</a>
          </div>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`${styles.nav_link} pt-4 pb-4 pr-5 pl-5`}>
          <ProfileIcon type="primary" />
          <a className={styles.link} href="#">
            Личный кабинет
          </a>
        </div>
      </nav>
    </header>
  )
}