import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { memo, useContext, useEffect, useState } from 'react';
import { BurgerConstructorContext } from '../../utils/burgerConstructorContext';
import styles from './burger-constructor.module.css';

const BurgerConstructor = memo(({ toggleModal }) => {
  const { burgerState, burgerDispatcher } = useContext(BurgerConstructorContext);
  const [bun, setBun] = useState(null);
  const [ingredients, setIngredient] = useState([]);

  useEffect(() => {
    setBun(burgerState.ingredients.find(
      ingredient =>
        ingredient.type === 'bun'));

    setIngredient(burgerState.ingredients.filter(
      ingredient =>
        ingredient.type !== 'bun'));
  }, [burgerState])

  return (
    <section className={`${styles.burgerConstructor} custom-scroll pt-25 pl-4`}>
      {!bun && ingredients.length == 0 &&
        <span className={`${styles.sign} text text_type_main-medium mt-5`}>
          Начните добавлять ингредиенты, чтобы сделать заказ
        </span>
      }
      <ul className={styles.ingredients_ul}>
        <li className={styles.list_element}>
          {bun &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
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
                  handleClose={() => burgerDispatcher({ type: 'REMOVE', payload: ingredient })}
                />
              </li>
            )}
          </ul>
        </li>
        <li className={styles.list_element}>
          {bun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          }
        </li>
      </ul>
      <div className={`${styles.sum_container} pt-10 pr-4`}>
        <span className={`${styles.sum} text text_type_digits-medium pr-10`}>
          {burgerState.summ}
          <CurrencyIcon type="primary" />
        </span>

        <div >
          <Button onClick={toggleModal} disabled={!bun || ingredients.length === 0} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
})

BurgerConstructor.propTypes = {
  // ingr: PropTypes.arrayOf(ingredientPropType).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default BurgerConstructor