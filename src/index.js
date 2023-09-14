import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose } from 'redux';
import { rootReducer } from "./services/reducers";
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from "./utils/webSocket-middleware";
import { configureStore } from "@reduxjs/toolkit";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleware = [thunk, socketMiddleware({
  wsConnect: 'ORDER_FEED_CONNECT',
  wsDisconnect: 'ORDER_FEED_DISCONNECT',
  wsConnecting: 'ORDER_FEED_WS_CONNECTING',
  onOpen: 'ORDER_FEED_WS_OPEN',
  onClose: 'ORDER_FEED_WS_CLOSE',
  onError: 'ORDER_FEED_ERROR',
  onMessage: 'ORDER_FEED_WS_MESSAGE'
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
