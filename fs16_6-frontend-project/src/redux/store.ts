import { configureStore } from '@reduxjs/toolkit'

import productReducer from './reducers/productsReducer'
import userReducer from './reducers/userReducer'
import cartReducer from './reducers/cartReducer'
import { CartItem } from '../types/CartItem'
import loginReducer from './reducers/loginReducer'
import categoryReducer from './reducers/categoryReducer'
import orderReducer from './reducers/orderReducer'

const preCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem('cart') || '[]'
)

export const createStore = () => {
  return configureStore({
    reducer: {
      categories:categoryReducer,
      products: productReducer,
      users: userReducer,
      orders: orderReducer,
      login: loginReducer,
      cart: cartReducer,
    },
    preloadedState: {
      cart: preCartReducer,
    },
  })
}

const store = createStore()

const updateLocalStorage = () => {
  const cart = store.getState().cart
  localStorage.setItem('cart', JSON.stringify(cart))
}

store.subscribe(updateLocalStorage)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
