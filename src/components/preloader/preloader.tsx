import styles from './preloader.module.css'

const Preloader = () => {
  return (
    <section className={styles.container}>
      <span className={styles.preloader}></span>
    </section>
  )
}

export default Preloader 