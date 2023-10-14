import { useState, useEffect, FC, RefObject } from "react";
import styles from './burger-ingredients-tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

type BurgerTabProps = {
  bunRef: RefObject<HTMLHeadingElement>
  sauceRef: RefObject<HTMLHeadingElement>
  mainRef:  RefObject<HTMLHeadingElement>
}

export const BurgerTab: FC<BurgerTabProps> = ({ bunRef, sauceRef, mainRef }) => {
  const [current, setCurrent] = useState('bun')

  const getDistanceFromTop = (element: HTMLHeadingElement) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top - 130;
    }
    return Infinity;
  };

  const setActiveTabOnScroll = () => {
    const bunDistance = Math.abs(getDistanceFromTop(bunRef?.current as HTMLHeadingElement));
    const sauceDistance = Math.abs(getDistanceFromTop(sauceRef?.current as HTMLHeadingElement));
    const mainDistance = Math.abs(getDistanceFromTop(mainRef.current as HTMLHeadingElement));

    if (bunDistance <= sauceDistance && bunDistance <= mainDistance) {
      setCurrent('bun');
    } else if (sauceDistance < bunDistance && sauceDistance < mainDistance) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  useEffect(() => {
    const container = document.querySelector('.scrollContainer') as HTMLDivElement
    const handleScroll = () => {
      setActiveTabOnScroll();
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollIntoIngredient = (section: string) => {
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