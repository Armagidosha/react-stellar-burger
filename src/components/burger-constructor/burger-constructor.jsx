import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import { useDrop } from 'react-dnd';
import { postOrderData } from '../../utils/api';

const BurgerConstructor = memo(({ toggleModal }) => {
  const burgerState = useSelector(store => store.burgerState);
  const dispatch = useDispatch()

  const bun = useMemo(() => burgerState.ingredients.find(ingredient => ingredient.type === 'bun'), [burgerState.ingredients]);
  const ingredients = useMemo(() => burgerState.ingredients.filter(ingredient => ingredient.type !== 'bun'), [burgerState.ingredients]);

  const [{ canDrop, isOver }, onDrop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = '#8585AD'
  } else if (canDrop) {
    backgroundColor = '#222'
  }

  const setLocked = () => {
    if (ingredients.length === 0) {
      return false
    } else {
      return true
    }
  }

  const handleClick = () => {
    dispatch(postOrderData({
      "ingredients": burgerState.ingredients.map(ingr => ingr._id)
    }))

    dispatch({
      type: 'OPEN_ORDER_MODAL'
    })
  }
  return (
    <section className={`${styles.burgerConstructor} custom-scroll pt-25 pl-4`}>
      <ul ref={onDrop} style={{ backgroundColor }} className={styles.ingredients_ul}>
        <li className={styles.list_element}>
          {bun &&
            <ConstructorElement
              type="top"
              isLocked={setLocked()}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => dispatch({ type: 'REMOVE', item: bun })}
            />
          }
        </li>
        <li className={styles.list_element}>
          <ul className={`${styles.main_ingredients_ul} custom-scroll`}>
            {ingredients.map(ingredient =>
              <li key={ingredient.uuid} className={styles.ingredients_li}>
                <DragIcon />
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => dispatch({ type: 'REMOVE', item: ingredient })}
                />
              </li>
            )}
          </ul>
        </li>
        <li className={styles.list_element}>
          {bun &&
            <ConstructorElement
              type="bottom"
              isLocked={setLocked()}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => dispatch({ type: 'REMOVE', item: bun })}
            />
          }
        </li>
      </ul>
      <div className={`${styles.sum_container} pt-10 pr-4`}>
        <span className={`${styles.sum} text text_type_digits-medium pr-10`}>
          {burgerState.totalPrice ? burgerState.totalPrice : '0'}
          <CurrencyIcon type="primary" />
        </span>

        <div >
          <Button onClick={handleClick} disabled={!bun || ingredients.length === 0} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
})

export default BurgerConstructor