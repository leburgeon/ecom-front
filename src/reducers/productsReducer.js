import { createSlice } from '@reduxjs/toolkit'
import productsService from '../services/productsService'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    pagedProducts: []
  },
  reducer: {
    setProducts(state, action){
      state.pagedProducts = action.payload
    },
    clearProducts(_state, _action){
      return {pagedProducts: []}
    }
  }
})

export default productsSlice.reducer

export const { setProducts, clearProducts } = productsSlice.actions

export const retrieveAndSetProducts = (filters={
  page: 1,
  limit: 30
}) => {
  return async (dispatch) => {
    try {
      const data = await productsService.retrieveProducts(filters)
      dispatch(setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}