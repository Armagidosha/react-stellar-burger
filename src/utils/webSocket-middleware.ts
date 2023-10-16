import { AppDispatch, RootState } from "..";
import { wsActions } from "../types/types";
import { refreshToken } from "./api";
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

export const socketMiddleware = (wsActions: wsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload || '');
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError('Error'));
          console.error(event)
        };

        socket.onmessage = async (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === 'Invalid or missing token') {
            await refreshToken()
          } else {
            if (socket) {
              dispatch(onMessage({
                data: parsedData,
                currentUrl: socket.url
              })
              );
            }
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
          if (event.code === 1006) {
            setTimeout(() => {
              if (socket) {
                const currentUrl = socket.url
                dispatch(wsConnect(currentUrl))
              }
            }, 5000);
          }
        };

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};