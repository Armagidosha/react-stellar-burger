import styles from './order-feed-stats.module.css';
import { useMemo } from 'react';
import { useSelector } from '../../utils/hooks';

const OrderStats = () => {
  const store = useSelector(store => store.ws)
  const ordersDone = useMemo(() => store?.ordersFeedAll?.orders?.filter(order => order.status === 'done'), [store.ordersFeedAll])
  const ordersPending = useMemo(() => store?.ordersFeedAll?.orders?.filter(order => order.status === 'pending'), [store.ordersFeedAll])
  
  return !store.isConnecting ? (
    <div>
      <div className={styles.container}>
        <div className={styles.ulContainer}>
          <h2 className='text text_type_main-medium'>Готовы:</h2>
          <ul className={`${styles.ul} custom-scroll`}>
            {ordersDone?.map((order) =>
              <li className={`${styles.ordersDone} text text_type_digits-default`} key={order._id}>{order.number}</li>
            )}
          </ul>
        </div>
        <div className={styles.ulContainer}>
          <h2 className='text text_type_main-medium'>В работе:</h2>
          <ul className={`${styles.ul} custom-scroll`}>
            {ordersPending?.map((order) =>
              <li className='text text_type_digits-default' key={order._id}>{order.number}</li>
            )}
          </ul>
        </div>
      </div>
      <h2 className='text text_type_main_medium mt-15'>Выполнено за все время:</h2>
      <p className={`${styles.digitsLarge} text text_type_digits-large`}>{store?.ordersFeedAll?.total}</p>
      <h2 className='text text_type_main_medium mt-15'>Выполнено за сегодня:</h2>
      <p className={`${styles.digitsLarge} text text_type_digits-large`}>{store?.ordersFeedAll?.totalToday}</p>
    </div>
  ) : null
}

export default OrderStats;
