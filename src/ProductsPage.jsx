import ProductCard from './components/ProductCard'
import { Grid2 as Grid } from '@mui/material'
// import { products } from '../data'
import ProductSearchBar from './components/ProductsSearchBar'
import { useSelector } from 'react-redux'
import PaginationController from './components/PaginationController'

const ProductsPage = () => {

  const { searched, pagedProducts } = useSelector(store => store.products)

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
      <ProductSearchBar/>
      {searched 
        ? pagedProducts.length > 0 
          ? renderProducts()
          : renderNoneFound()
        : renderSearchSomthing()}
      
    </>
    
  )
}

export default ProductsPage