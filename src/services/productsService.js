import axios from 'axios'
import { baseUrl } from "./utils"

// Method which fetches the products from api
// Method is passed a filters object containing any desired filters, including pagination
const retrieveProducts = async (filters) => {
  const params = new URLSearchParams(filters)
  const response = await axios.get(baseUrl + '/api/products?' + params.toString())
  return response.data
}

export default {retrieveProducts}