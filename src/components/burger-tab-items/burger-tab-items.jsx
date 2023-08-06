import { useState, useEffect } from "react";
import styles from './burger-tab-items.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerTab = ({ bunRef, sauceRef, mainRef }) => {
  const [current, setCurrent] = useState('bun')

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

  const scrollIntoIngredient = (section) => {
    setCurrent(section);
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <ul className={`${styles.tab_ul} pt-5`}>
      <li>
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
  )
}