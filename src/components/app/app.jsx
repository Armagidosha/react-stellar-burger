import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import NotFound404 from "../not-found/not-found";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../services/actions/ingredients";
import { checkUserAuth } from "../../services/actions/user";

import styles from "./app.module.css";

import RegisterPage from "../../pages/register/register";
import LoginPage from "../../pages/login/login";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import RecoverPasswordPage from "../../pages/recover-password/recover-password";
import ProfilePage from "../../pages/profile/profile";
import HomePage from "../../pages/home/HomePage";
import ProfileOrdersPage from "../../pages/profile-orders/profile-orders";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />

            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path="/recover-password" element={<OnlyUnAuth component={<RecoverPasswordPage />} />} />
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrdersPage />} />} />
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          {background && (
            <Routes>
              <Route path='/order' element={
                <Modal>
                  <OrderDetails />
                </Modal>
              } />
              <Route path='/ingredients/:ingredientId' element={
                <Modal>
                  <IngredientDetails />
                </Modal>
              }
              />
            </Routes>
          )}
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
