import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-ingredients.module.css';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const OrderIngredients = memo(({ order }) => {

  const { items } = useSelector(store => store.ingredients)
  const orderItemData = order.ingredients.map(element => items.find(ingredient => ingredient._id === element))

  const totalPrice = orderItemData.reduce((accamulator, element) => accamulator + element.price, 0)

  return (
    <div className={styles.container}>
      {orderItemData.slice(0, 5).map((el, index) =>
        <div
          className={styles.elContainer}
          key={index}
          style={{
            zIndex: 6 - index,
            transform: `translateX(-${15 * index}px)`,
          }}>
          <img className={styles.elImage} src={el.image} alt={el.name} />
        </div>
      )}
      {orderItemData.length > 6 && (
        <div
          className={styles.elContainer}
          style={{
            zIndex: 1,
            transform: `translateX(-75px)`,
          }}>
          <img className={`${styles.elImage} ${styles.elImageHidden}`}
            src={orderItemData[5].image}
            alt={orderItemData[5].name} />
          <span
            className={`${styles.hiddenElements} text text_type_digits-default`}>
            {orderItemData.length < 100 ? (
              `+${orderItemData.length - 5}`
            ) : '...'}
          </span>
        </div>)}
      <div className={styles.totalPriceContainer}>
        <span className='text text_type_digits-default'>{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
})

OrderIngredients.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderIngredients;