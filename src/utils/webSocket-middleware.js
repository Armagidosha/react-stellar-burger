import { refreshToken } from "./api";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

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
        socket = new WebSocket(action.payload);
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

        socket.onmessage = async event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === 'Invalid or missing token') {
            refreshToken()
          } else {
            dispatch(onMessage({
              data: parsedData,
              currentUrl: socket.url
            })
            );
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
          if (event.code === 1006) {
            setTimeout(() => {
              wsConnect(event.currentTarget.url)
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