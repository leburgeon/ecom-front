import ProductCard from './components/ProductCard'
import { Grid2 as Grid } from '@mui/material'
// import { products } from '../data'
import ProductSearchBar from './components/ProductsSearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { searchWith } from './reducers/productsReducer'
import { updateFilter } from './reducers/filtersReducer'
import PaginationController from './components/PaginationController'

const ProductsPage = () => {

  const { searched, pagedProducts } = useSelector(store => store.products)
  const dispatch = useDispatch()

  const handleSearch = (filters) => {
    dispatch(searchWith(filters))
    dispatch(updateFilter(filters))
  }

  const renderProducts = () => {
    return (
      <>
        <Grid container spacing={2}>
          {pagedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>
        <PaginationController />
      </>
      
    )
  }

  const renderNoneFound = () => {
    return (
      <h3>No products found... try searching for somthing or remove some filters!</h3>
    )
  }

  const renderSearchSomthing = () => {
    return (
      <h3>Try searching for something!</h3>
    )
  }

  return (
    <>
      <ProductSearchBar onSearch={handleSearch}/>
      {searched 
        ? pagedProducts.length > 0 
          ? renderProducts()
          : renderNoneFound()
        : renderSearchSomthing()}
      
    </>
    
  )
}

export default ProductsPage