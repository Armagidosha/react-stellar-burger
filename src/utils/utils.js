export const utils = {
  url: 'https://norma.nomoreparties.space/api/',
}

export const path = {
  login: '/login',
  profile: '/profile',
  profileOrders: '/profile/orders',
  forgot: '/forgot-password',
  recover: '/recover-password',
  register: '/register',
  feed: '/feed',
  order: '/order',
  ingredientDetails: '/ingredients/',

}

export const setLocalStorage = (data) => {
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("accessToken", data.accessToken);
}

export const clearLocalStorage = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}