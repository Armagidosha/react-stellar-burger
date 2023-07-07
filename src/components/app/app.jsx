import { useEffect, useState } from "react";
import { utils } from "../../utils/utils";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [data, setData] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIngr, setCurrentIngr] = useState(null)
  const [currentModal, setCurrentModal] = useState('')

  useEffect(() => {
    const getResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };

    fetch(utils.url)
      .then(getResponse)
      .then((data) => {
        setData(data.data);
        setHasErrors(false);
      })
      .catch((err) => {
        setHasErrors(true);
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const openIngredientModal = (ingr) => {
    setCurrentIngr(ingr);
    toggleModal();
    setCurrentModal('ingredient');
  }

  const openOrderModal = () => {
    toggleModal();
    setCurrentModal('order');
  }

  const modalRoot = document.getElementById('modal');

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {data.length && !hasErrors ? (
          <>
            <BurgerIngredients data={data} toggleModal={openIngredientModal} />
            <BurgerConstructor data={data} toggleModal={openOrderModal} />
          </>
        ) : (
          <span className="text text_type_main-medium mt-5">
            Ошибка обработки данных
          </span>
        )}
      </main>
      <div id='modal'></div>
      {modalRoot && isOpen && (
        <Modal toggleModal={toggleModal} container={modalRoot}>
          {currentModal === 'ingredient' ?
            <IngredientDetails ingredient={currentIngr} /> :
            <OrderDetails />
          }
        </Modal>
      )}
    </div>
  );
}

export default App;
