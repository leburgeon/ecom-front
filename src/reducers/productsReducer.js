import { createSlice } from '@reduxjs/toolkit'
import productsService from '../services/productsService'
import { notify } from './notificationReducer'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    pagedProducts: [],
    searched: false,
    pagination: {
      page: 1,
      limit: 5,
      productCount: 0,
      pageCount: 0
    }
  },
  reducer: {
    setProducts(state, action){
      state.pagedProducts = action.payload
    },
    clearProducts(state, _action){
      state.pagedProducts = []
    },
    setSearched(state, action){
      state.searched = true
    },
    setProductCount(state, action){
      state.pagination.productCount = action.payload
      state.pagination.pageCount = Math.ceil(action.payload/state.pagination.limit)
    },
    setPageNumber(state, action){
      state.pagination.page = action.payload
    },
    setPageLimit(state, action){
      state.pagination.limit = action.payload
      state.pagination.pageCount = Math.ceil(state.pagination.productCount / action.payload)
    }
  }
})

export default productsSlice.reducer

export const { setProducts, clearProducts, setSearched, setProductCount } = productsSlice.actions

export const searchWith = (filters) => {
  return async (dispatch) => {
    try {
      const { data } = await productsService.retrieveProducts(filters)
      dispatch(setProducts(data.products))
      dispatch(setSearched())
      dispatch(setProductCount(data.productCount))
    } catch (error) {
      console.error(error)
      dispatch(notify({
        message: `Error retrieving results ${error.name}, please try again`,
        severity: "error"
      }))
    }
  }
}