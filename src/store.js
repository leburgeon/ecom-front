import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    user: userReducer
  }
})

export default store