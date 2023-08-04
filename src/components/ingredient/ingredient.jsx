import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { memo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = memo(({ data }) => {
  const dispatch = useDispatch()
  const ingredientCounts = useSelector((store) => store.burgerState.ingredientCounts)
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { data },
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

  const ingredientId = data._id;
  const count = ingredientCounts[ingredientId] || 0

  return (
    <div ref={dragRef} className={styles.container} onClick={() =>
      dispatch({
        type: 'OPEN_INGREDIENT_MODAL',
        item: data
      })}>
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

  );
});

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};

export default Ingredient;
