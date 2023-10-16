import styles from './profile.orders.module.css';
import ProfileAnchors from "../../components/profile/profileAnchors";
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { wsConnect, wsDisconnect } from '../../services/actions/webSocket';
import { utils } from '../../utils/utils';
import OrderCard from '../../components/order-card/order-card';
import Preloader from '../../components/preloader/preloader';

const ProfileOrdersPage = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store.ws)

  const accessToken = localStorage?.getItem('accessToken')?.split('Bearer ')[1]

  useEffect(() => {
    dispatch(wsConnect(`${utils.orders}?token=${accessToken}`))
    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch, accessToken])
  const reversedOrders = store.ordersFeedProfile?.orders.toReversed()

  return (
    <section className={styles.container}>
      <div>
        <ProfileAnchors />
        <p className={`${styles.sub} mt-20 pl-10 text text_type_main-default`} >
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.cardsContainer}>
        {!store.ordersFeedProfile ?
          <div className={styles.cardsContainerLoader}>
            <Preloader />
          </div> :
          <OrderCard path='/profile/orders/' data={reversedOrders || []} />}
      </div>
    </section >
  )
}

export default ProfileOrdersPage;