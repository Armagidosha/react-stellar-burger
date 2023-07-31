import { useEffect, useState, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerConstructorContext } from "../../utils/burgerConstructorContext";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { fetchIngredients, postOrderData } from "../../utils/api";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [data, setData] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currentIngr, setCurrentIngr] = useState(null);
  const [currentModal, setCurrentModal] = useState('');
  const [orderId, setOrderId] = useState({
    isLoading: false,
    hasError: false,
    data: null
  })

  useEffect(() => {
    fetchIngredients(setData);
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const openIngredientModal = (ingr) => {
    setCurrentIngr(ingr);
    toggleModal();
    setCurrentModal('ingredient');
    burgerDispatcher({
      type: 'ADD',
      payload: {
        ...ingr,
        uuid: uuidv4()
      }
    })
    console.log(ingr)
  }

  const openOrderModal = () => {
    toggleModal();
    setCurrentModal('order');
    postOrderData(
      {
        "ingredients": burgerState.ingredients.map(ingr => ingr._id)
      },
      setOrderId
    )
  }

  const initialState = { ingredients: [], summ: 0 };

  function burgerReducer(state, action) {
    switch (action.type) {
      case "ADD":
        const isBun = action.payload.type === 'bun';
        const prevBun = state.ingredients.find(ingredient => ingredient.type === 'bun');
        return {
          ingredients: isBun
            ? [...state.ingredients.filter(ingredient => ingredient.type !== 'bun'), action.payload]
            : [...state.ingredients, action.payload],
          summ: isBun
            ? prevBun ? state.summ + action.payload.price - prevBun.price : state.summ + action.payload.price
            : state.summ + action.payload.price
        };
      case "REMOVE":
        return {
          ingredients: state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid),
          summ: state.summ - action.payload.price
        };
      default:
        throw new Error(`Неправильный тип экшена: ${action.type}`);
    }
  };
  const [burgerState, burgerDispatcher] = useReducer(burgerReducer, initialState);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {data.data.length && !data.hasError ? (
          <>
            <BurgerIngredients data={data.data} toggleModal={openIngredientModal} />
            <BurgerConstructorContext.Provider value={{ burgerState, burgerDispatcher }} >
              <BurgerConstructor data={data.data} toggleModal={openOrderModal} />
            </BurgerConstructorContext.Provider>
          </>
        ) : (
          <span className="text text_type_main-medium mt-5">
            Ошибка обработки данных
          </span>
        )}
      </main>
      {isOpen && (
        <Modal toggleModal={toggleModal}>
          {currentModal === 'ingredient' ? (
            <IngredientDetails ingredient={currentIngr} />
          ) : (
            !orderId.isLoading && <OrderDetails order={orderId} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
