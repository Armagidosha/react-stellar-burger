import { utils } from '../../utils/utils';
import {
    ORDER_FEED_WS_CLOSE,
    ORDER_FEED_WS_CONNECTING,
    ORDER_FEED_WS_ERROR,
    ORDER_FEED_WS_MESSAGE,
    ORDER_FEED_WS_OPEN
} from '../actions/webSocket';

const initialState = {
    isConnected: false,
    isConnecting: false,
    ordersFeedAll: {},
    ordersFeedProfile: {},
    connectingError: '',
    isItems: false
};

export const webSocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_FEED_WS_CONNECTING:
            return {
                ...state,
                isConnecting: true,
            };
        case ORDER_FEED_WS_OPEN:
            return {
                ...state,
                isConnected: true,
                isConnecting: false,
                connectingError: ''
            };
        case ORDER_FEED_WS_CLOSE:
            return {
                ...state,
                isConnected: false,
            };
        case ORDER_FEED_WS_ERROR:
            return {
                ...state,
                isConnected: false,
                connectingError: action.payload
            };
        case ORDER_FEED_WS_MESSAGE:
            if (action.currentUrl !== `${utils.orders}/all`) {
                return {
                    ...state,
                    ordersFeedProfile: action.payload,
                    isItems: true
                }
            } else {
                return {
                    ...state,
                    ordersFeedAll: action.payload,
                    isItems: true
                }
            }

        default:
            return state;
    }
}