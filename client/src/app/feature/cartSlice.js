import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'shopease-cart'

const loadCart = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY)
    const parsedCart = savedCart ? JSON.parse(savedCart) : []

    if (!Array.isArray(parsedCart)) {
      console.error('Unable to load the saved cart: expected an array.')
      return []
    }

    const items = parsedCart.filter((item) =>
      getCartItemId(item) != null
      && typeof item.name === 'string'
      && Number.isFinite(item.price)
      && Number.isFinite(item.quantity)
      && item.quantity > 0,
    )

    if (items.length !== parsedCart.length) {
      console.error('Invalid saved cart items were discarded.')
    }

    return items
  } catch (error) {
    console.error('Unable to load the saved cart.', error)
    return []
  }
}

export const getCartItemId = (product) => product?._id ?? product?.id

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const productId = getCartItemId(product)
      const addQty = typeof product.quantity === 'number' && product.quantity > 0 ? product.quantity : 1

      if (!productId) {
        return
      }

      const existingItem = state.items.find(
        (item) => String(getCartItemId(item)) === String(productId),
      )

      if (existingItem) {
        existingItem.quantity += addQty
      } else {
        state.items.push({ ...product, quantity: addQty })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => String(getCartItemId(item)) !== String(action.payload),
      )
    },
    setCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(
        (cartItem) => String(getCartItemId(cartItem)) === String(id),
      )

      if (!item) {
        return
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => String(getCartItemId(cartItem)) !== String(id),
        )
        return
      }

      item.quantity = Math.floor(quantity)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, setCartItemQuantity, clearCart } = cartSlice.actions
export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export const cartStorageKey = STORAGE_KEY

export default cartSlice.reducer
