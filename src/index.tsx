import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { socketMiddleware } from "./utils/webSocket-middleware";
import { configureStore } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./services/slices/webSocket-slice";
import { wsConnect, wsDisconnect } from "./services/actions/webSocket";
import { rootReducer } from "./services/slices";

const composeEnhancers =
  (typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = [thunk, socketMiddleware({
  wsConnect: wsConnect,
  wsDisconnect: wsDisconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage
})];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware)
  },
  devTools: composeEnhancers,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
