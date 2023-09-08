import styles from './profile.orders.module.css';
import ProfileAnchors from "../../components/profile/profileAnchors";

const ProfileOrdersPage = () => {
  return (
    <section className={styles.container}>
      <div>
        <ProfileAnchors />
        <p className={`${styles.sub} mt-20 pl-10 text text_type_main-default`} >
          тут тоже пусто{'('}
        </p>
      </div>
      <span>Тут пока пусто</span>
    </section>
  )
}

export default ProfileOrdersPage;