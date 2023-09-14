import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { memo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from "react-router-dom";
import { path } from "../../utils/utils";

const Ingredient = memo(({ data }) => {
  const dispatch = useDispatch()
  const ingredientCounts = useSelector((store) => store.burgerState.ingredientCounts)
  const order = useSelector(store => store.order.orderRequest)
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { data }, 
    canDrag: () => {
      return !order
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        dispatch({
          type: 'ADD',
          item: {
            ...item.data,
            uuid: uuidv4()
          }
        })
      }
    }
  })

  const location = useLocation()
  const ingredientId = data._id;
  const count = ingredientCounts[ingredientId] || 0

  return (
    <Link
      key={ingredientId}
      to={`${path.ingredient}${ingredientId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div ref={dragRef} className={styles.container}>
        <img className={`${styles.image} pr-4 pl-4`} src={data.image} alt={data.name} />
        <div className={`${styles.priceContainer} mt-1 mb-1`}>
          <p className={'text text_type_digits-default pr-2'}>{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={'text text_type_main-default'}>{data.name}</p>
        {count !== 0 &&
          <Counter count={count} size="default" extraClass="m-1" />
        }
      </div>
    </Link>

  );
});

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};

export default Ingredient;
