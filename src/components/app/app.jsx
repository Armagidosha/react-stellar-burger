import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { fetchIngredients } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients);
  const modal = useSelector(store => store.modal);
  const order = useSelector(store => store.order)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {data.items.length && !data.itemsFailed ? (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        ) : (
          <span className="text text_type_main-medium mt-5">
            Ошибка обработки данных
          </span>
        )}
      </main>
      {modal.isOpened && !order.orderRequest && (
        <Modal>
          {modal.currentModal === 'ingredient' ? (
            <IngredientDetails />
          ) : (
            !order.orderRequest && <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
