import { useEffect } from "react";
import { useDispatch } from "../../utils/hooks";
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
import { path } from "../../utils/utils";
import FeedPage from "../../pages/feed/feed";
import OrderFeedDetails from "../order-feed-details/order-feed-details";

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
            <Route path={path.feed} element={<FeedPage />} />
            <Route path={path.register} element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path={path.login} element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path={path.forgot} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path={path.recover} element={<OnlyUnAuth component={<RecoverPasswordPage />} />} />
            <Route path={path.profile} element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path={path.profileOrders} element={<OnlyAuth component={<ProfileOrdersPage />} />} />
            <Route path={`${path.ingredient}:ingredientId`} element={<IngredientDetails />} />
            <Route path={path.profileFeedOrders} element={<OnlyAuth component={<OrderFeedDetails isOrder={'page'} />} />} />
            <Route path={path.feedOrders} element={<OrderFeedDetails isOrder={'page'} />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          {background && (
            <Routes>
              <Route path={path.order} element={<Modal><OrderDetails /></Modal>} />
              <Route path={`${path.ingredient}:ingredientId`} element={<Modal><IngredientDetails /></Modal>} />
              <Route path={`${path.profileOrders}/:orderNumber`}
                element={<OnlyAuth component={<Modal><OrderFeedDetails isOrder={'profile'} /></Modal>} />} />
              <Route path={path.feedOrders} element={<Modal><OrderFeedDetails isOrder={'feed'} /></Modal>} />
            </Routes>
          )}
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
