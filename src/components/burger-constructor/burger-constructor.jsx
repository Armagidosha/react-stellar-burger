import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import styles from './burger-constructor.module.css';

const BurgerConstructor = memo(({ data, toggleModal }) => {

  return (
    <section className={`${styles.burgerConstructor} custom-scroll pt-25 pl-4`}>
      <ul className={styles.ingredients_ul}>
        <li className={styles.list_element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[7].name} (Верх)`}
            price={data[7].price}
            thumbnail={data[7].image}
          />
        </li>
        <li className={styles.list_element}>

          <ul className={`${styles.main_ingredients_ul} custom-scroll`}>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[8].name}
                price={data[8].price}
                thumbnail={data[8].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[12].name}
                price={data[12].price}
                thumbnail={data[12].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[11].name}
                price={data[11].price}
                thumbnail={data[11].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[8].name}
                price={data[8].price}
                thumbnail={data[8].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[12].name}
                price={data[12].price}
                thumbnail={data[12].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[11].name}
                price={data[11].price}
                thumbnail={data[11].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[8].name}
                price={data[8].price}
                thumbnail={data[8].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[12].name}
                price={data[12].price}
                thumbnail={data[12].image}
              />
            </li>
            <li className={styles.ingredients_li}>
              <DragIcon />
              <ConstructorElement
                isLocked={false}
                text={data[11].name}
                price={data[11].price}
                thumbnail={data[11].image}
              />
            </li>
          </ul>
        </li>
        <li className={styles.list_element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[7].name} (Низ)`}
            price={data[7].price}
            thumbnail={data[7].image}
          />
        </li>
      </ul>
      <div className={`${styles.sum_container} pt-10 pr-4`}>
        <span className={`${styles.sum} text text_type_digits-medium pr-10`}>
          {'99999'}
          <CurrencyIcon type="primary" />
        </span>

        <div onClick={() => toggleModal()}>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
})

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default BurgerConstructor