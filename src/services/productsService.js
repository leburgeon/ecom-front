import axios from 'axios'

// Method which fetches the products from api
// Method is passed a filters object containing any desired filters, including pagination
const retrieveProducts = async (filters) => {
  const params = new URLSearchParams(filters)
  const response = await axios.get('/api/products?' + params.toString())
  return response.data
}

// Method for retrieving the page for paginated responses
// This route does not return the metatdata necessary for the first search
const getPageOf = async (filters) => {
  const params = new URLSearchParams(filters)
  const response = await axios.get('/api/products/pageof?' + params.toString())
  return response.data
}

// Method for retrieving the data of a single product
const getProduct = async (id) => {
  const response = await axios.get('/api/products/' + id)
  return response.data
}

const incrementBasketItem = async (productId, quantity) => {
  const response = await axios.post('/api/basket/increment', {productId, quantity})
  return response.data
}

const deleteItemFromBasket = async (productId) => {
  const response = await axios.delete('/api/basket/' + productId)
  return response.data
}

const getBasket = async () => {
  const response = await axios.get('/api/basket')
  console.log(response.data)
  return response.data
}

export default { retrieveProducts, getPageOf, getProduct, incrementBasketItem, deleteItemFromBasket, getBasket }