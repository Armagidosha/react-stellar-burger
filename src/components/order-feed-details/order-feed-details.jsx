import { useParams } from 'react-router-dom';
import styles from './order-feed-details.module.css';
import { useCallback, useEffect, useState } from 'react'
import { getOrderImage } from '../../utils/api';
import { useSelector } from 'react-redux';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderFeedDetails = ({ isOrder }) => {
  const { orderNumber } = useParams();

  const { items } = useSelector(store => store.ingredients)
  const store = useSelector(store => store.ws);
  const [response, setResponse] = useState({})

  const setData = useCallback(() => {
    switch (isOrder) {
      case 'feed': {
        return setResponse(store?.ordersFeedAll?.orders?.find((element) => element.number === parseInt(orderNumber)))
      }
      case 'profile': {
        return setResponse(store?.ordersFeedProfile?.orders?.find((element) => element.number === parseInt(orderNumber)))
      }
      case 'page': {
        return getOrderImage(orderNumber).then(res => setResponse(res.orders.slice()[0]))
      }
      default: {
        return
      }
    }
  }, [isOrder, orderNumber, store])

  useEffect(() => {
    setData()
  }, [setData])

  let orderStatus;
  if (response) {
    orderStatus = response?.status === 'done' ?
      { status: 'Выполнен', color: '#00CCCC' } :
      response.status === 'pending' ?
        { status: 'Готовится', color: 'white' } :
        { status: 'Создан', color: 'white' };
  }

  const findedData = response?.ingredients?.map(element => items.find(ingredient => ingredient._id === element))

  const result = [];

  findedData?.forEach(ingredient => {
    const existingIngredient = result.find(item => item.ingredients._id === ingredient._id);

    if (existingIngredient) {
      existingIngredient.count++;
      existingIngredient.totalPrice += ingredient.price;
    } else {
      result.push({
        count: 1,
        ingredients: ingredient,
        totalPrice: ingredient.price
      });
    }
  });
  const totalPrice = result?.reduce((accamulator, element) => accamulator + element.totalPrice, 0)

  return response ? (
    <div className={styles.container}>
      <span className={`${styles.orderNumber} text text_type_digits-default`}>#{response?.number}</span>
      <p className={`${styles.orderName} pt-10 text text_type_main-medium`}>{response?.name}</p>
      <span className={`${styles.orderStatus} pt-3 text_text_type_main-default`} style={{ color: orderStatus?.color }}>{orderStatus?.status}</span>
      <p className={`${styles.orderComposition} pt-15 text text_type_main-medium`}>Состав:</p>
      <ul className={`${styles.orderStat} custom-scroll`}>
        {result?.map((element) =>
          <li className={`${styles.orderStatContainer} pt-6 pr-6`} key={element.ingredients._id}>
            <div className={styles.orderStatImageContainer}>
              <img className={styles.orderStatImage} src={element.ingredients.image} alt={element.ingredients.image} />
            </div>
            <p className={`${styles.orderText} pl-4 pr-4 text text_type_main-default`}>{element.ingredients.name}</p>
            <div className={styles.orderStatPriceContainer}>
              <span className='text text_type_digits-default'>{`${element.count} x ${element.ingredients.price}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        )}
      </ul>
      <div className={`${styles.subContainer} pt-10`}>
        <span className='text text_type_main-small text_color_inactive'>
          <FormattedDate date={new Date(response?.createdAt)} /> i-GMT+3
        </span>
        <div className={styles.orderStatPriceContainer}>
          <span className='text text_type_digits-default'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  ) : <div className={`${styles.container} ${styles.containerIsLoading}`}>
    <p className={`text text_type_main-medium`}>Загрузка...</p>
  </div>
}

OrderFeedDetails.propTypes = {
  isOrder: PropTypes.string.isRequired
};

export default OrderFeedDetails;