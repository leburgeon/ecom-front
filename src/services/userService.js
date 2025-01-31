import axios from "axios";
import { baseUrl } from "./utils";

// For attempting to parse user info from localstorage for user initial state
const getFromLocalSync = () => {
  // Attempt to retrieve the user data from local storage
  const userInLocal = window.localStorage.getItem('ecomUser')

  // Returns null if there is no user data in local storage
  if (!userInLocal){
    return null
  }

  // Attempts to parse the JSON formatted data, loggs the error if error parsing and returns null
  try {
    return {...JSON.parse(userInLocal)}
  } catch (error){
    console.error(error)
    window.localStorage.removeItem('ecomUser')
    return null
  }
}

// For logging using credentials
const login = async (credentials) => {
  const { email, password } = credentials
  const response = await axios.post(baseUrl + '/api/login', {email, password})
  return response.data
}

const registerNewUser = async (credentials) => {
  const { name, email, password } = credentials
  const response = await axios.post(baseUrl + '/api/users', {name, email, password})
  return response.data
}

export default {getFromLocalSync, login, registerNewUser}