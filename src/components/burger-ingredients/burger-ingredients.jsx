import { useMemo, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { BurgerTab } from '../burger-ingredients-tabs/burger-ingredients-tabs';

const BurgerIngredients = () => {
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const data = useSelector(store => store.ingredients.items);
  const modal = useSelector(store => store.modal)
  
  const [bun, sauce, main] = useMemo(() => {
    const bun = data.filter(el => el.type === 'bun');
    const sauce = data.filter(el => el.type === 'sauce');
    const main = data.filter(el => el.type === 'main');
    return [bun, sauce, main];
  }, [data]);

  return (
    <section className={`pt-10`}>
      <h2 className='text text_type_main-large'>Соберите бургер</h2>
      <BurgerTab bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef}/>
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
      {modal.isOpened && modal.currentModal === 'ingredient' &&
        <Modal>
          <IngredientDetails />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients