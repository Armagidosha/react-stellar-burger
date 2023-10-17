import { AppDispatch, RootState } from "..";
import { wsActions } from "../types/types";
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { refreshToken } from "./api";
import { utils } from "./utils";

export const socketMiddleware = (wsActions: wsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let errorMessage = ''
    let timer: ReturnType<typeof setTimeout>

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

      if (wsConnect.match(action) && !socket) {
        socket = new WebSocket(action.payload || '');
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Error'));
        };

        socket.onmessage = async (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === 'Invalid or missing token') {
            errorMessage = parsedData.message
          } else {
            if (socket) {
              dispatch(onMessage({
                data: parsedData,
                currentUrl: socket.url
              }));
            }
          }
        };

        socket.onclose = async (event) => {
          dispatch(onClose())
          if (event.code === 1006) {
            if (errorMessage === 'Invalid or missing token') {
              const { accessToken } = await refreshToken()
              if (socket) {
                dispatch(wsDisconnect())
              }
              dispatch(wsConnect(`${utils.orders}?token=${accessToken.split('Bearer ')[1]}`))
              errorMessage = ''
            } else {
              timer = setTimeout(() => {
                dispatch(wsDisconnect())
                if (!socket) {
                  dispatch(wsConnect((event.target as WebSocket).url))
                }
              }, 5000)
            }
          }
        };

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
          errorMessage = ''
          clearTimeout(timer)
        }
      }

      next(action);
    };
  };
};