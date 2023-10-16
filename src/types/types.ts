import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export interface RequestOptions extends RequestInit {
  headers: {
    'Content-Type': string
    authorization?: string;
  };
}

export type Ingredients = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  uuid?: string;
}

export type OrderInfo = {
  createdAt: string
  ingredients: Ingredients[]
  number: number
  owner: {
    [key: string]: string
  }
  price: number
  status: string
  updatedAt: string
  _id: string
}

export type OrderData = {
  'ingredients': string[]
}

export type UserData = {
  [key: string]: string
}

export type WSFeedOrders = {
  readonly orders: FeedOrders[]
  readonly success: boolean
  readonly total: number
  readonly totalToday: number
}

export type FeedOrders = {
  _id: string
  ingredients: string[]
  status: string
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

export type Message = {
  data: WSFeedOrders
  currentUrl: String
}

export type wsActions = {
  wsConnect: ActionCreatorWithPayload<string>
  wsDisconnect: ActionCreatorWithoutPayload
  wsConnecting: ActionCreatorWithoutPayload
  onOpen: ActionCreatorWithoutPayload
  onClose: ActionCreatorWithoutPayload
  onMessage: ActionCreatorWithPayload<Message>
  onError: ActionCreatorWithPayload<string>
}