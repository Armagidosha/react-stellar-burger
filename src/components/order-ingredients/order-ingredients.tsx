import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-ingredients.module.css';
import { FC, memo } from 'react';
import { useSelector } from '../../utils/hooks';
import { FeedOrders } from '../../types/types';

type OrderIngredientsProps = {
  order: FeedOrders
}

const OrderIngredients: FC<OrderIngredientsProps> = memo(({ order }) => {
  const { items } = useSelector(store => store.ingredients)
  const orderItemData = order.ingredients.map(element => items.find(ingredient => ingredient._id === element))
  
  const totalPrice = orderItemData.reduce((accumulator, element) => {
    return element && element.price !== undefined ? accumulator + element.price : accumulator;
  }, 0);
  
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
          <img className={styles.elImage} src={el?.image} alt={el?.name} />
        </div>
      )}
      {orderItemData.length > 5 && (
        <div
          className={styles.elContainer}
          style={{
            zIndex: 1,
            transform: `translateX(-75px)`,
          }}>
          <img className={`${styles.elImage} ${styles.elImageHidden}`}
            src={orderItemData[5]?.image}
            alt={orderItemData[5]?.name} />
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

export default OrderIngredients;