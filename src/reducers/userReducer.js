import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/userService'
import { notify, clearAll as clearAllNotifications } from './notificationReducer'
import { AxiosError } from "axios";

const userSlice = createSlice({
  name: 'user',
  initialState: userService.getFromLocalSync(),
  reducers: {
    setUser (state, action) {
      return action.payload
    },
    clearUser (_state, _action) {
      return null
    }
  }
})

export const {setUser, clearUser} = userSlice.actions

export default userSlice.reducer

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const { username, name, token } = await userService.login(credentials)
      dispatch(setUser({username, name, token}))
      window.localStorage.setItem('ecomUser', JSON.stringify({username, name, token}))
      dispatch(notify({
        message: `Welcome ${name}!`,
        severity: 'success'
      }))
    } catch (error){
      dispatch(logout())
      let errorMessage = error.message
      if (error instanceof AxiosError){
        errorMessage = `Error logging in: ${error.response.status}`
      }
      dispatch(notify({message: errorMessage, severity: 'error'}))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearUser())
    window.localStorage.removeItem('ecomUser')
    dispatch(clearAllNotifications())
  }
}

