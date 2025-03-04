import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
    count: 0
  },
  reducers: {
    setBasketCount (state, action){
      state.count = action.payload
    },
    setBasketItems (state, action){
      state.items = action.payload
    },
    resetBasket(_state, _action){
      return {
        items: [],
        count: 0
      }
    },
    // Increments the quantity of the item with the matching id by the amount specified
    // Then filters for any items with quantities less than 1
    incrementQuantityOfItem(state, action){
      state.items = state.items.map(item => {
        if (item.product.id === action.payload.id){
          return {product: item.product, quantity: item.quantity + action.payload.quantity}
        }
        return item
      }).filter(item => item.quantity > 0)
    },
    removeItem(state, action){
      state.items = state.items.filter(item => item.product.id !== action.payload.id)
    }
  }
})

export const {setBasketCount, setBasketItems, resetBasket, incrementQuantityOfItem, removeItem} = basketSlice.actions

export default basketSlice.reducer