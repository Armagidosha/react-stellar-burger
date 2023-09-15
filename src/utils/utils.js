export const utils = {
  url: 'https://norma.nomoreparties.space/api/',
  orders: 'wss://norma.nomoreparties.space/orders'
}

export const path = {
  login: '/login',
  profile: '/profile',
  profileOrders: '/profile/orders',
  profileFeedOrders: 'profile/orders/:orderNumber',
  recover: '/recover-password',
  register: '/register',
  order: '/order',
  ingredient: 'ingredients/',
  feed: '/feed',
  forgot: '/forgot-password',
  feedOrders: 'feed/:orderNumber'
}

export const setLocalStorage = (data) => {
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("accessToken", data.accessToken);
}

export const clearLocalStorage = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}