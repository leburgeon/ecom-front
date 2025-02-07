import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import productsReducer from './reducers/productsReducer'
import filterReducer from './reducers/filtersReducer'

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    user: userReducer,
    products: productsReducer,
    filters: filterReducer
  }
})

export default store