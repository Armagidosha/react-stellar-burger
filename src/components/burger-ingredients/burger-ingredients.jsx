import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo, memo, useState } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';

const BurgerIngredients = memo(({data, toggleModal}) => {
  const [current, setCurrent] = useState('bun');

  const [bun, sauce, main] = useMemo(() => {
    const bun = data.filter(el => el.type === 'bun');
    const sauce = data.filter(el => el.type === 'sauce');
    const main = data.filter(el => el.type === 'main');
    return [bun, sauce, main];
  }, [data]);

  const scrollIntoIngredient = (section) => {
    setCurrent(section);
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.burgerIngredients} pt-10`}>
      <h2 className='text text_type_main-large'>Соберите бургер</h2>
      <ul className={`${styles.tab_ul} pt-5`}>
        <li className={styles.tab_list}>
          <Tab value="bun" active={current === 'bun'} onClick={() => scrollIntoIngredient('bun')}>
            Булки
          </Tab>
        </li>
        <li className={styles.tab_list}>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => scrollIntoIngredient('sauce')}>
            Соусы
          </Tab>
        </li>
        <li className={styles.tab_list}>
          <Tab value="main" active={current === 'main'} onClick={() => scrollIntoIngredient('main')}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={`${styles.ingredients_container} mt-10 custom-scroll`}>
        <h2 id="bun" className={`text text_type_main-medium pb-6`}>
          Булки
        </h2>
        <ul className={styles.ingredients_ul}>
          {bun.map(el => {
            return <Ingredient 
            data={el} 
            onClick={toggleModal}
            key={el._id}
            />;
          })}
        </ul>
        <h2 id="sauce" className={`text text_type_main-medium pt-10 pb-6`}>
          Соусы
        </h2>
        <ul className={styles.ingredients_ul}>
          {sauce.map(el => {
            return <Ingredient 
            data={el} 
            onClick={toggleModal}
            key={el._id}
            />;
          })}
        </ul>
        <h2 id="main" className={`text text_type_main-medium pt-10 pb-6`}>
          Начинки
        </h2>
        <ul className={styles.ingredients_ul}>
          {main.map(el => {
            return <Ingredient 
            data={el} 
            onClick={toggleModal}
            key={el._id}
            />;
          })}
        </ul>
      </div>
    </section>
  );
})

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default BurgerIngredients