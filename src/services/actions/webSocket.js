import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction('ORDER_FEED_CONNECT');
export const wsDisconnect = createAction('ORDER_FEED_DISCONNECT');