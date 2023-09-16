import { connect } from "../services/actions/webSocket";
import { refreshToken } from "./api";

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {

                socket = new WebSocket(action.payload);
                dispatch({ type: wsConnecting });
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                };

                socket.onmessage = async event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === 'Invalid or missing token') {
                        refreshToken()
                    }
                    else {
                        dispatch({
                            type: onMessage,
                            payload: parsedData,
                            currentUrl: socket.url
                        });
                    }
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose });
                    if (event.code === 1006) {
                        setTimeout(() => {
                            connect(event.currentTarget.url)
                        }, 5000);
                    }
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};