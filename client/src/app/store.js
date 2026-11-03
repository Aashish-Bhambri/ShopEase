import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { cartStorageKey } from './feature/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

store.subscribe(() => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      cartStorageKey,
      JSON.stringify(store.getState().cart.items),
    )
  } catch (error) {
    console.error('Unable to save the cart.', error)
  }
})