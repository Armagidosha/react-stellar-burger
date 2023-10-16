import { useSelector } from "../../utils/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { path } from "../../utils/utils";
import { FC, ReactElement } from "react";
import Preloader from "../preloader/preloader";

type Component = {
  component: ReactElement
}

type ProtectedProps = Component & {
  onlyUnAuth?: boolean
}

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={path.login} state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth: FC<Component> = Protected;
export const OnlyUnAuth: FC<Component> = ({component}) => (
  <Protected onlyUnAuth={true} component={component} />
);