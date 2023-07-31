import styles from './order-details.module.css';
import confirmed from '../../images/confirmed.svg';
import PropTypes from 'prop-types';

const OrderDetails = (order) => {

  return (
    <div className={styles.container}>
      <h2 className={`${styles.order} text text_type_digits-large pt-30`}>{order.order.data}</h2>
      <p className={`${styles.text} text text_type_main-medium pt-8`}>идентификатор заказа</p>
      <img className={`${styles.confirmed} mt-15`} src={confirmed} alt={'Иконка подтвержденного заказа'}></img>
      <p className={`${styles.subText} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
      <p className={`${styles.subText_color} text text_type_main-default text_color_inactive pt-2 pb-30 `}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    order: PropTypes.shape({
      data: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderDetails
