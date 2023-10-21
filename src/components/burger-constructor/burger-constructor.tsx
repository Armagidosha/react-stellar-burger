import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './burger-constructor.module.css';
import { DndProvider, useDrop } from 'react-dnd';
import { postOrder } from '../../services/actions/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerMainItem } from '../burger-main-item/burger-main-item';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { path } from '../../utils/utils';
import { clearStash, removeIngredient, updateIngredients } from '../../services/slices/burger-slice';
import { Ingredients } from '../../types/types';

const BurgerConstructor = () => {
  const user = useSelector(store => store.user.user);
  const burgerState = useSelector(store => store.burgerState);
  const order = useSelector(store => store.order);

  const dispatch = useDispatch();

  const bun = useMemo(() => burgerState.ingredients.find(ingredient => ingredient.type === 'bun'), [burgerState.ingredients]);
  const ingredients = useMemo(() => burgerState.ingredients.filter(ingredient => ingredient.type !== 'bun'), [burgerState.ingredients]);

  const location = useLocation()
  const navigate = useNavigate()

  const [{ canDrop, isOver }, onDrop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver
  let backgroundColor = ''
  let stashColor = ''
  if (isActive) {
    backgroundColor = '#8585ad'
    stashColor = '#3A3A55'
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

  const moveElementInArray = (array: Ingredients[], fromIndex: number, toIndex: number) => {
    const newArray = [...array];
    newArray.splice(toIndex, 0, newArray.splice(fromIndex, 1)[0]);
    return newArray;
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedIngredients = moveElementInArray(ingredients, dragIndex, hoverIndex);
    dispatch(updateIngredients(updatedIngredients));
  };

  const handleClickPost = () => {
    if (user) {
      dispatch(postOrder({
        "ingredients": burgerState.ingredients.map(ingr => ingr._id)
      })).then((res) => {
        dispatch(clearStash())
        navigate(`${path.order}/${res.payload}`, { state: { background: location } })
      })
    } else {
      navigate(path.login)
    }
  }

  return (
    <section className={`${styles.burgerConstructor} custom-scroll pt-25 pl-4`}>
      <ul ref={onDrop} style={{ backgroundColor }} className={styles.ingredients_ul}>
        {burgerState.ingredients.length ?
          <>

            <li className={styles.list_element}>
              {bun &&
                <ConstructorElement
                  type="top"
                  isLocked={setLocked()}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  handleClose={() => dispatch(removeIngredient(bun))}
                />
              }
            </li>
            <li className={`${styles.list_element} ${styles.list_main_element}`}>
              <DndProvider backend={HTML5Backend}>
                <ul className={`${styles.main_ingredients_ul} custom-scroll`}>
                  {ingredients.map((ingredient, index) =>
                    <BurgerMainItem key={ingredient.uuid} ingredient={ingredient} _id={ingredient._id} moveCard={moveCard} index={index} />
                  )}
                </ul>
              </DndProvider>
            </li>
            <li className={styles.list_element}>
              {bun &&
                <ConstructorElement
                  type="bottom"
                  isLocked={setLocked()}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  handleClose={() => dispatch(removeIngredient(bun))}
                />
              }
            </li>
          </> :
          <div className={styles.stash_container}>
            <p className={`${styles.stash} text text_type_main-default text_color_inactive`} style={{ color: stashColor }}>
              {`В вашей корзине пока пусто :(`}
            </p>
            <p className={`${styles.stash} text text_type_main-default text_color_inactive`} style={{ color: stashColor }}>
              Чтобы добавить, перенесите ингредиент из левого меню
            </p>
          </div>
        }
      </ul>
      <div className={`${styles.sum_container} pt-10 pr-4`}>
        <span className={`${styles.sum} text text_type_digits-medium pr-10`}>
          {burgerState.totalPrice ? burgerState.totalPrice : '0'}
          <CurrencyIcon type="primary" />
        </span>

        <div>
          <Button onClick={handleClickPost} disabled={!bun || ingredients.length === 0 || order.orderRequest} htmlType="button" type="primary" size="large">
            {order.orderRequest ? 'Оформление...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BurgerConstructor