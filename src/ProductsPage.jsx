import {useState} from 'react'
import { Stack,
  Divider
} from '@mui/material'
import { useSelector } from 'react-redux'
import ProductCard from './components/ProductCard'
import { Grid2 as Grid } from '@mui/material'

const ProductsPage = () => {
  const [loading, setLoading] = useState(true)

  

  return (
    <Grid container spacing={2}>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </Grid>
  )
}

export default ProductsPage