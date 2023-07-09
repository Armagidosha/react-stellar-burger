import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { memo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';

const Ingredient = memo(({data, onClick}) => {
  return (
    <div className={styles.container} onClick={() => onClick(data)}>
      <img className={`${styles.image} pr-4 pl-4`} src={data.image} alt={data.name} />
      <div className={`${styles.priceContainer} mt-1 mb-1`}>
        <p className={'text text_type_digits-default pr-2'}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={'text text_type_main-default'}>{data.name}</p>
    </div>
  );
});

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
