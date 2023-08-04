import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';



const IngredientDetails = () => {
  const ingredient = useSelector(store => store.modal.currentIngredient)

  return (
    <div className={styles.container}>
      <h2 className={`${styles.details} text text_type_main-large pt-10 pl-10`}>Детали ингредиента</h2>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name}></img>
      <p className={`${''} text text_type_main-medium pt-4`}>{ingredient.name}</p>
      <ul className={styles.macronutrients_ul}>
        <li className={styles.macronutrients_li}>
          <p className={'text text_type_main-default text_color_inactive'}>Калории, ккал</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.calories}</p>
        </li>

        <li className={styles.macronutrients_li}>
          <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.proteins}</p>
        </li>

        <li className={styles.macronutrients_li}>
          <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.fat}</p>
        </li>

        <li className={styles.macronutrients_li}>
          <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.carbohydrates}</p>
        </li>

      </ul>
    </div>
  )
}

export default IngredientDetails