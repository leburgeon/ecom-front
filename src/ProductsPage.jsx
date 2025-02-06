import ProductCard from './components/ProductCard'
import { Grid2 as Grid } from '@mui/material'
// import { products } from '../data'
import ProductSearchBar from './components/ProductsSearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { searchWith } from './reducers/productsReducer'

const ProductsPage = () => {

  const { searched, pagedProdcuts } = useSelector(store => store.products)
  const dispatch = useDispatch()

  const handleSearch = (filters) => {
    dispatch(searchWith(filters))
  }

  const renderProducts = () => {
    return (
      <Grid container spacing={2}>
        {pagedProdcuts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    )
  }

  const renderNoneFound = () => {
    return (
      <h3>No products found... try searching for somthing or remove some filters!</h3>
    )
  }

  const renderSearchSomthing = () => {
    return (
      <h3>Try searching for somthing or search by category!</h3>
    )
  }

  return (
    <>
      <ProductSearchBar onSearch={handleSearch}/>
      {searched 
        ? pagedProdcuts.length > 0 
          ? renderProducts()
          : renderNoneFound()
        : renderSearchSomthing()}
    </>
    
  )
}

export default ProductsPage