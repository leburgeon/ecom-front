import axios from 'axios'

const checkout = async () => {
  const response = axios.get('/api/checkout')
  return response.data
}

export default {checkout}