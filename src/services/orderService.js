import axios from 'axios'
import { baseUrl } from './utils'

const getOrdersForUser = async () => {
  const response = await axios.get(baseUrl + '/orders')
  return response.data
}

export default { getOrdersForUser }