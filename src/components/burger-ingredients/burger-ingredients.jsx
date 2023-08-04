import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const data = useSelector(store => store.ingredients.items)

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

  const getDistanceFromTop = (element) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top;
    }
    return Infinity;
  };
  const setActiveTabOnScroll = () => {
    const bunDistance = Math.abs(getDistanceFromTop(bunRef.current));
    const sauceDistance = Math.abs(getDistanceFromTop(sauceRef.current));
    const mainDistance = Math.abs(getDistanceFromTop(mainRef.current));

    if (bunDistance <= sauceDistance && bunDistance <= mainDistance) {
      setCurrent('bun');
    } else if (sauceDistance < bunDistance && sauceDistance < mainDistance) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setActiveTabOnScroll(container.scrollTop);
    };
    const container = document.querySelector('.scrollContainer');
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <section className={`pt-10`}>
      <h2 className='text text_type_main-large'>Соберите бургер</h2>
      <ul className={`${styles.tab_ul} pt-5`}>
        <li className={styles.tab_list}>
          <Tab value="bun" active={current === 'bun'} onClick={scrollIntoIngredient}>
            Булки
          </Tab>
        </li>
        <li className={styles.tab_list}>
          <Tab value="sauce" active={current === 'sauce'} onClick={scrollIntoIngredient}>
            Соусы
          </Tab>
        </li>
        <li className={styles.tab_list}>
          <Tab value="main" active={current === 'main'} onClick={scrollIntoIngredient}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={`${styles.ingredients_container} pt-10 custom-scroll scrollContainer`}>
        <h2 ref={bunRef} id="bun" className={`text text_type_main-medium pb-6`}>
          Булки
        </h2>
        <ul className={styles.ingredients_ul}>
          {bun.map(el => {
            return <Ingredient
              data={el}
              key={el._id}
            />;
          })}
        </ul>
        <h2 ref={sauceRef} id="sauce" className={`text text_type_main-medium pt-10 pb-6`}>
          Соусы
        </h2>
        <ul className={styles.ingredients_ul}>
          {sauce.map(el => {
            return <Ingredient
              data={el}
              key={el._id}
            />;
          })}
        </ul>
        <h2 ref={mainRef} id="main" className={`text text_type_main-medium pt-10 pb-6`}>
          Начинки
        </h2>
        <ul className={styles.ingredients_ul}>
          {main.map(el => {
            return <Ingredient
              data={el}
              key={el._id}
            />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients