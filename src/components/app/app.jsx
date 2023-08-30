import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import { Route, Routes } from "react-router-dom";
import { NotFound404 } from "../not-found/not-found";

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
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/" element={
              data.items.length && !data.itemsFailed ? (
                <>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </>
              ) : null
            } />
            <Route path="*" element={<NotFound404 />}/>
            </Routes>
        </DndProvider> 
      </main>
    </div>
  );
}

export default App;
