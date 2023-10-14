import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { FC, memo } from 'react';
import OrderIngredients from '../order-ingredients/order-ingredients';
import { Link, useLocation } from 'react-router-dom';
import { FeedOrders } from '../../types/types';

type OrderCardProps = {
  path: string
  data: FeedOrders[]
}

const OrderCard: FC<OrderCardProps> = memo(({ data, path }) => {
  const location = useLocation()

  return (
    <ul className={`${styles.ul} custom-scroll`}>
      {data?.map((order) =>
        <Link
        key={order._id}
        className={styles.link}
        state={{ background: location }}
        to={`${path}${order.number}`}
        >
          <li className={styles.cardContainer}>
            <div className={styles.inLiContainer}>
              <p className='text text_type_digits-default'>#{order.number}</p>
              <span className='text text_type_main-small text_color_inactive'>
                <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
              </span>
            </div>
            <h2 className='mt-6 text text_type_main-medium'>{order.name}</h2>
            <OrderIngredients order={order} />
          </li>
        </Link>
      )}
    </ul>
  )
})

export default OrderCard;