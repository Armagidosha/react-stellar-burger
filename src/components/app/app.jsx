import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients())
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
    </div>
  );
}

export default App;
