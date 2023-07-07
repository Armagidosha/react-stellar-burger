import styles from './order-details.module.css';
import confirmed from '../../images/confirmed.svg';

const OrderDetails = () => {
  return (
  <div className={styles.container}>
    <h2 className={`${styles.order} text text_type_digits-large pt-30`}>{'034536'}</h2>
    <p className={`${styles.text} text text_type_main-medium pt-8`}>идентификатор заказа</p>
    <img className={`${styles.confirmed} mt-15`} src={confirmed} alt={'Иконка подтвержденного заказа'}></img>
    <p className={`${styles.subText} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
    <p className={`${styles.subText_color} text text_type_main-default text_color_inactive pt-2 pb-30 `}>Дождитесь готовности на орбитальной станции</p>
  </div>
  )
}

export default OrderDetails
