import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect } from '../../services/actions/webSocket';
import { utils } from '../../utils/utils';
import styles from './feed.module.css';
import { useEffect } from 'react';
import OrderStats from '../../components/order-feed-stats/order-feed-stats';
import OrderCard from '../../components/order-card/order-card';

const FeedPage = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store.ws)
  useEffect(() => {
    dispatch(connect(`${utils.orders}/all`))
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])

  return store.isConnecting ? <p>Загрузка...</p> :
    (
      <section className={styles.container}>
        <h1 className='text text_type_main-large'>Лента заказов</h1>
        <div className={styles.contentContainer}>
          <div className={styles.cardsContainer}>
            <OrderCard path={'/feed/'} data={store?.ordersFeedAll?.orders} />
          </div>
          <OrderStats store={store} />
        </div>
      </section>
    )
}

export default FeedPage;