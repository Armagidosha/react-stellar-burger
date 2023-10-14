import { createAction } from "@reduxjs/toolkit";
import { Message } from "../../types/types";

export const wsConnect = createAction<string>('ORDER_FEED_CONNECT');
export const wsDisconnect = createAction('ORDER_FEED_DISCONNECT');
export const wsConnecting = createAction('ws/connecting');
export const wsOpen = createAction('ws/open');
export const wsClose = createAction('ws/close');
export const wsMessage = createAction<Message>('ws/message');
export const wsError = createAction<string>('ws/error');