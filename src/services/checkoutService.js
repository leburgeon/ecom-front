import axios from 'axios'
import { baseUrl } from './utils'

const checkout = async () => {
  const response = axios.get(baseUrl + '/api/checkout')
  return response.data
}

export default {checkout}