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
    }
  }
})

export const {setBasketCount, setBasketItems, resetBasket} = basketSlice.actions

export default basketSlice.reducer