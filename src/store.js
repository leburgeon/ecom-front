import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import productsReducer from './reducers/productsReducer'

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    user: userReducer,
    products: productsReducer
  }
})

export default store